import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { createEntry, listEntriesByUserId } from "@/lib/diary-repository";
import type { DiaryEntriesFilter, DiaryEntry } from "@/views/diary/diary-entry.types";
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
  res: NextApiResponse<DiaryEntry | DiaryEntry[] | { error: string }>,
) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const filters: DiaryEntriesFilter = {
      projectId: parseFilterQueryValue(req.query.projectId) || null,
      skills: parseSkillFilter(req.query.skills),
      fromDate: parseFilterQueryValue(req.query.fromDate),
      toDate: parseFilterQueryValue(req.query.toDate),
    };
    const entries = await listEntriesByUserId(session.user.id, filters);
    return res.status(200).json(entries);
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid body" });
  }

  const entry = await createEntry(session.user.id, parsed.data);
  return res.status(201).json(entry);
}

function parseFilterQueryValue(value: string | string[] | undefined) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : "";
}

function parseSkillFilter(value: string | string[] | undefined): string[] {
  if (typeof value !== "string") return [];
  return [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))];
}
