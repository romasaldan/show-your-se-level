import type { ProjectDraft } from "@/views/profile/profile.types";

export function normalizeProjectDraft(draft: ProjectDraft): ProjectDraft {
  return {
    name: draft.name.trim(),
    kind: draft.kind,
    startDate: normalizeProjectDate(draft.startDate),
    endDate: normalizeProjectDate(draft.endDate),
    skillNames: normalizeSkillNames(draft.skillNames),
  };
}

export function toPrismaProjectDate(value: number | null): bigint | null {
  if (value == null) {
    return null;
  }
  return BigInt(value);
}

export function normalizeProjectDateFromDb(
  value: bigint | number | string | null,
): number | null {
  if (value == null) {
    return null;
  }
  if (typeof value === "bigint") {
    return Number(value);
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (/^\d+$/.test(value)) {
    return Number(value);
  }
  return null;
}

export function mapProjectWithDates<
  T extends {
    startDate: bigint | number | string | null;
    endDate: bigint | number | string | null;
  },
>(project: T): Omit<T, "startDate" | "endDate"> & { startDate: number | null; endDate: number | null } {
  return {
    ...project,
    startDate: normalizeProjectDateFromDb(project.startDate),
    endDate: normalizeProjectDateFromDb(project.endDate),
  };
}

export function normalizeSkillNames(skillNames: string[]): string[] {
  const normalized = skillNames.map((name) => name.trim()).filter(Boolean);
  return [...new Set(normalized)];
}

function normalizeProjectDate(value: number | null): number | null {
  if (value == null) {
    return null;
  }
  return Number.isFinite(value) ? Math.trunc(value) : null;
}
