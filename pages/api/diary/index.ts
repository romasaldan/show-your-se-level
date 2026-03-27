import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { createEntry } from "@/lib/diary-repository";
import type { DiaryEntry } from "@/views/diary/diary-entry.types";
import { z } from "zod";

const bodySchema = z.object({
  projectId: z.string().min(1),
  date: z.string(),
  title: z.string().trim().min(1),
  details: z.string().trim().min(1),
  skills: z.string(),
  importance: z.enum(["low", "medium", "high"]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DiaryEntry | { error: string }>,
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

  const entry = await createEntry(session.user.id, parsed.data);
  return res.status(201).json(entry);
}
