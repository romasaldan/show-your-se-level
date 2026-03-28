import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { authOptions } from "@/auth";
import { createProject } from "@/lib/profile-repository";
import type { ProfileProject } from "@/views/profile/profile.types";

const projectDateSchema = z
  .union([z.number().int().nonnegative(), z.null(), z.undefined()])
  .transform((value) => value ?? null);

const bodySchema = z.object({
  name: z.string().trim().min(1),
  kind: z.enum(["company", "personal"]),
  startDate: projectDateSchema,
  endDate: projectDateSchema,
  skillNames: z.array(z.string()).default([]),
}).refine(
  (data) => data.startDate == null || data.endDate == null || data.endDate >= data.startDate,
  {
    message: "End date cannot be earlier than start date",
    path: ["endDate"],
  },
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileProject | { error: string }>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid body" });
  }

  try {
    const project = await createProject(session.user.id, parsed.data);
    return res.status(201).json(project);
  } catch {
    return res.status(500).json({ error: "Failed to create project" });
  }
}
