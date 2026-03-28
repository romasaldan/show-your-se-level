import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  DiaryEntry,
  DiaryEntryDraft,
  DiaryEntriesFilter,
  ProjectOption,
} from "@/views/diary/diary-entry.types";

function parseSkillNames(skills: string): string[] {
  return skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function listEntriesByUserId(
  userId: string,
  filters?: DiaryEntriesFilter,
): Promise<DiaryEntry[]> {
  const normalizedSkills = [...new Set((filters?.skills ?? []).map((skill) => skill.trim()))].filter(
    Boolean,
  );

  const where: Prisma.AchievementWhereInput = {
    userId,
  };

  if (filters?.projectId) {
    where.projectId = filters.projectId;
  }

  if (filters?.fromDate || filters?.toDate) {
    where.date = {
      ...(filters.fromDate ? { gte: filters.fromDate } : {}),
      ...(filters.toDate ? { lte: filters.toDate } : {}),
    };
  }

  if (normalizedSkills.length > 0) {
    where.AND = normalizedSkills.map((skillName) => ({
      skills: {
        some: {
          skill: {
            name: {
              equals: skillName,
              mode: "insensitive",
            },
          },
        },
      },
    }));
  }

  const achievements = await prisma.achievement.findMany({
    where,
    orderBy: { date: "desc" },
    include: {
      project: { select: { id: true, name: true } },
      skills: { include: { skill: { select: { name: true } } } },
    },
  });

  return achievements.map((a) => ({
    id: a.id,
    date: a.date,
    title: a.title,
    details: a.details,
    importance: a.importance,
    skills: a.skills.map((s) => s.skill.name).join(", "),
    projectId: a.project.id,
    projectName: a.project.name,
  }));
}

export async function createEntry(
  userId: string,
  draft: DiaryEntryDraft,
): Promise<DiaryEntry> {
  const skillNames = parseSkillNames(draft.skills);

  const achievement = await prisma.achievement.create({
    data: {
      userId,
      projectId: draft.projectId,
      date: draft.date,
      title: draft.title,
      details: draft.details,
      importance: draft.importance,
      skills: {
        create: await buildSkillConnections(skillNames),
      },
    },
    include: {
      project: { select: { id: true, name: true } },
      skills: { include: { skill: { select: { name: true } } } },
    },
  });

  return toEntry(achievement);
}

export async function updateEntry(
  userId: string,
  achievementId: string,
  draft: DiaryEntryDraft,
): Promise<DiaryEntry> {
  const existing = await prisma.achievement.findUnique({
    where: { id: achievementId },
    select: { userId: true },
  });

  if (!existing || existing.userId !== userId) {
    throw new Error("Achievement not found or access denied");
  }

  const skillNames = parseSkillNames(draft.skills);

  await prisma.achievementSkill.deleteMany({
    where: { achievementId },
  });

  const achievement = await prisma.achievement.update({
    where: { id: achievementId },
    data: {
      projectId: draft.projectId,
      date: draft.date,
      title: draft.title,
      details: draft.details,
      importance: draft.importance,
      skills: {
        create: await buildSkillConnections(skillNames),
      },
    },
    include: {
      project: { select: { id: true, name: true } },
      skills: { include: { skill: { select: { name: true } } } },
    },
  });

  return toEntry(achievement);
}

export async function deleteEntry(userId: string, achievementId: string): Promise<void> {
  const existing = await prisma.achievement.findUnique({
    where: { id: achievementId },
    select: { userId: true },
  });

  if (!existing || existing.userId !== userId) {
    throw new Error("Achievement not found or access denied");
  }

  await prisma.achievement.delete({
    where: { id: achievementId },
  });
}

export async function listSkills(): Promise<string[]> {
  const skills = await prisma.skill.findMany({
    orderBy: { name: "asc" },
    select: { name: true },
  });
  return skills.map((s) => s.name);
}

export async function listProjectsByUserId(userId: string): Promise<ProjectOption[]> {
  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { name: "asc" }],
    select: { id: true, name: true, kind: true, isDefault: true },
  });

  return projects.map((p) => ({
    id: p.id,
    name: p.name,
    kind: p.kind,
    isDefault: p.isDefault,
  }));
}

async function buildSkillConnections(skillNames: string[]) {
  if (skillNames.length === 0) return [];

  await prisma.skill.createMany({
    data: skillNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const skills = await prisma.skill.findMany({
    where: { name: { in: skillNames } },
    select: { id: true },
  });

  return skills.map((s) => ({ skillId: s.id }));
}

type AchievementWithRelations = {
  id: string;
  date: string;
  title: string;
  details: string;
  importance: "low" | "medium" | "high";
  project: { id: string; name: string };
  skills: { skill: { name: string } }[];
};

function toEntry(a: AchievementWithRelations): DiaryEntry {
  return {
    id: a.id,
    date: a.date,
    title: a.title,
    details: a.details,
    importance: a.importance,
    skills: a.skills.map((s) => s.skill.name).join(", "),
    projectId: a.project.id,
    projectName: a.project.name,
  };
}
