import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProfileIdentity, ProfileProject, ProjectDraft } from "@/views/profile/profile.types";

export class ProjectAccessError extends Error {}
export class DefaultProjectMutationError extends Error {}
export class ProjectHasAchievementsError extends Error {}

export async function getProfileByUserId(userId: string): Promise<ProfileIdentity> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      githubLogin: true,
      githubUrl: true,
      name: true,
      email: true,
      image: true,
      bio: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function listProjectsForProfile(userId: string): Promise<ProfileProject[]> {
  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { name: "asc" }],
    select: { id: true, name: true, kind: true, isDefault: true },
  });

  if (projects.length === 0) {
    return [];
  }

  const skillRows = await prisma.$queryRaw<{ projectId: string; skillName: string }[]>(
    Prisma.sql`
      SELECT ps."projectId", s."name" AS "skillName"
      FROM "ProjectSkill" ps
      INNER JOIN "Skill" s ON s."id" = ps."skillId"
      WHERE ps."projectId" IN (${Prisma.join(projects.map((project) => project.id))})
      ORDER BY s."name" ASC
    `,
  );

  const skillsByProjectId = new Map<string, string[]>();

  for (const row of skillRows) {
    const next = skillsByProjectId.get(row.projectId) ?? [];
    next.push(row.skillName);
    skillsByProjectId.set(row.projectId, next);
  }

  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    kind: project.kind,
    isDefault: project.isDefault,
    skills: skillsByProjectId.get(project.id) ?? [],
  }));
}

export async function createProject(userId: string, draft: ProjectDraft): Promise<ProfileProject> {
  const normalized = normalizeProjectDraft(draft);

  const project = await prisma.project.create({
    data: {
      userId,
      name: normalized.name,
      kind: normalized.kind,
    },
    select: { id: true, name: true, kind: true, isDefault: true },
  });

  await replaceProjectSkills(project.id, normalized.skillNames);

  return {
    ...project,
    skills: normalized.skillNames,
  };
}

export async function updateProject(
  userId: string,
  projectId: string,
  draft: ProjectDraft,
): Promise<ProfileProject> {
  const normalized = normalizeProjectDraft(draft);
  await assertProjectMutable(userId, projectId);

  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      name: normalized.name,
      kind: normalized.kind,
    },
    select: { id: true, name: true, kind: true, isDefault: true },
  });

  await replaceProjectSkills(project.id, normalized.skillNames);

  return {
    ...project,
    skills: normalized.skillNames,
  };
}

export async function deleteProject(userId: string, projectId: string): Promise<void> {
  await assertProjectMutable(userId, projectId);

  try {
    await prisma.project.delete({
      where: { id: projectId },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      throw new ProjectHasAchievementsError("Project has related diary items");
    }
    throw error;
  }
}

export async function listEncounteredSkillsForUser(userId: string): Promise<string[]> {
  const rows = await prisma.$queryRaw<{ name: string }[]>(
    Prisma.sql`
      SELECT encountered."name"
      FROM (
        SELECT DISTINCT s."name"
        FROM "Achievement" a
        INNER JOIN "AchievementSkill" "achievementSkill"
          ON "achievementSkill"."achievementId" = a."id"
        INNER JOIN "Skill" s
          ON s."id" = "achievementSkill"."skillId"
        WHERE a."userId" = ${userId}

        UNION

        SELECT DISTINCT s."name"
        FROM "Project" p
        INNER JOIN "ProjectSkill" ps ON ps."projectId" = p."id"
        INNER JOIN "Skill" s ON s."id" = ps."skillId"
        WHERE p."userId" = ${userId}
      ) AS encountered
      ORDER BY encountered."name" ASC
    `,
  );

  return rows.map((row) => row.name);
}

export async function listAvailableSkills(): Promise<string[]> {
  const skills = await prisma.skill.findMany({
    orderBy: { name: "asc" },
    select: { name: true },
  });

  return skills.map((skill) => skill.name);
}

async function assertProjectMutable(userId: string, projectId: string): Promise<void> {
  const existing = await prisma.project.findUnique({
    where: { id: projectId },
    select: { userId: true, kind: true, isDefault: true },
  });

  if (!existing || existing.userId !== userId) {
    throw new ProjectAccessError("Project not found or access denied");
  }

  if (existing.isDefault || existing.kind === "general") {
    throw new DefaultProjectMutationError("General project cannot be modified");
  }
}

function normalizeProjectDraft(draft: ProjectDraft): ProjectDraft {
  return {
    name: draft.name.trim(),
    kind: draft.kind,
    skillNames: normalizeSkillNames(draft.skillNames),
  };
}

function normalizeSkillNames(skillNames: string[]): string[] {
  const normalized = skillNames.map((name) => name.trim()).filter(Boolean);
  return [...new Set(normalized)];
}

async function replaceProjectSkills(projectId: string, skillNames: string[]): Promise<void> {
  await prisma.$executeRaw(
    Prisma.sql`
      DELETE FROM "ProjectSkill"
      WHERE "projectId" = ${projectId}
    `,
  );

  if (skillNames.length === 0) {
    return;
  }

  await prisma.skill.createMany({
    data: skillNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const skills = await prisma.skill.findMany({
    where: { name: { in: skillNames } },
    select: { id: true },
  });

  if (skills.length === 0) {
    return;
  }

  const values = skills.map((skill) => Prisma.sql`(${projectId}, ${skill.id})`);

  await prisma.$executeRaw(
    Prisma.sql`
      INSERT INTO "ProjectSkill" ("projectId", "skillId")
      VALUES ${Prisma.join(values)}
      ON CONFLICT ("projectId", "skillId") DO NOTHING
    `,
  );
}
