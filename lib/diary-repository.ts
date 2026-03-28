import { Prisma } from "@prisma/client";
import { parseSkillNames, toAchievementSkillConnections, toEntry } from "@/lib/diary-repository.utils";
import { prisma } from "@/lib/prisma";
import { normalizeProjectDateFromDb } from "@/lib/profile-repository.utils";
import type {
  DiaryEntry,
  DiaryEntryDraft,
  DiaryEntriesFilter,
  ProjectOption,
} from "@/views/diary/diary-entry.types";

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
  const achievement = await prisma.$transaction(async (tx) => {
    const skills = await upsertSkills(skillNames, tx);

    const created = await tx.achievement.create({
      data: {
        userId,
        projectId: draft.projectId,
        date: draft.date,
        title: draft.title,
        details: draft.details,
        importance: draft.importance,
        skills: {
          create: toAchievementSkillConnections(skills),
        },
      },
      include: {
        project: { select: { id: true, name: true } },
        skills: { include: { skill: { select: { name: true } } } },
      },
    });

    await ensureProjectHasSkills(draft.projectId, skills, tx);

    return created;
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

  const achievement = await prisma.$transaction(async (tx) => {
    const skills = await upsertSkills(skillNames, tx);

    await tx.achievementSkill.deleteMany({
      where: { achievementId },
    });

    const updated = await tx.achievement.update({
      where: { id: achievementId },
      data: {
        projectId: draft.projectId,
        date: draft.date,
        title: draft.title,
        details: draft.details,
        importance: draft.importance,
        skills: {
          create: toAchievementSkillConnections(skills),
        },
      },
      include: {
        project: { select: { id: true, name: true } },
        skills: { include: { skill: { select: { name: true } } } },
      },
    });

    await ensureProjectHasSkills(draft.projectId, skills, tx);

    return updated;
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
    select: {
      id: true,
      name: true,
      kind: true,
      isDefault: true,
      startDate: true,
      endDate: true,
    },
  });

  return projects.map((p) => ({
    id: p.id,
    name: p.name,
    kind: p.kind,
    isDefault: p.isDefault,
    startDate: normalizeProjectDateFromDb(p.startDate),
    endDate: normalizeProjectDateFromDb(p.endDate),
  }));
}

type SkillRecord = {
  id: string;
  name: string;
};

async function upsertSkills(
  skillNames: string[],
  tx: Prisma.TransactionClient = prisma,
): Promise<SkillRecord[]> {
  if (skillNames.length === 0) return [];

  await tx.skill.createMany({
    data: skillNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  return tx.skill.findMany({
    where: { name: { in: skillNames } },
    select: { id: true, name: true },
  });
}

async function ensureProjectHasSkills(
  projectId: string,
  skills: SkillRecord[],
  tx: Prisma.TransactionClient = prisma,
) {
  if (skills.length === 0) return;

  const values = skills.map((skill) => Prisma.sql`(${projectId}, ${skill.id})`);
  await tx.$executeRaw(
    Prisma.sql`
      INSERT INTO "ProjectSkill" ("projectId", "skillId")
      VALUES ${Prisma.join(values)}
      ON CONFLICT ("projectId", "skillId") DO NOTHING
    `,
  );
}
