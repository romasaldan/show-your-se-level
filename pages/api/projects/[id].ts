import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { authOptions } from "@/auth";
import {
  DefaultProjectMutationError,
  ProjectAccessError,
  ProjectHasAchievementsError,
  deleteProject,
  updateProject,
} from "@/lib/profile-repository";
import type { ProfileProject } from "@/views/profile/profile.types";

const bodySchema = z.object({
  name: z.string().trim().min(1),
  kind: z.enum(["company", "personal"]),
  skillNames: z.array(z.string()).default([]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileProject | { id: string } | { error: string }>,
) {
  if (req.method !== "PATCH" && req.method !== "DELETE") {
    res.setHeader("Allow", "PATCH, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const id = req.query["id"];
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  if (req.method === "DELETE") {
    try {
      await deleteProject(session.user.id, id);
      return res.status(200).json({ id });
    } catch (error) {
      return handleError(error, res);
    }
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid body" });
  }

  try {
    const project = await updateProject(session.user.id, id, parsed.data);
    return res.status(200).json(project);
  } catch (error) {
    return handleError(error, res);
  }
}

function handleError(
  error: unknown,
  res: NextApiResponse<ProfileProject | { id: string } | { error: string }>,
) {
  if (error instanceof ProjectAccessError) {
    return res.status(404).json({ error: "Project not found or access denied" });
  }
  if (error instanceof DefaultProjectMutationError) {
    return res.status(403).json({ error: "General project cannot be deleted" });
  }
  if (error instanceof ProjectHasAchievementsError) {
    return res.status(409).json({ error: "Project has diary entries and cannot be deleted" });
  }
  return res.status(500).json({ error: "Failed to process project" });
}
