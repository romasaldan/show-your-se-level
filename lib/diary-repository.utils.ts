import type { DiaryEntry } from "@/views/diary/diary-entry.types";

type SkillRecord = {
  id: string;
  name: string;
};

export type AchievementWithRelations = {
  id: string;
  date: string;
  title: string;
  details: string;
  importance: "low" | "medium" | "high";
  project: { id: string; name: string };
  skills: { skill: { name: string } }[];
};

export function parseSkillNames(skills: string): string[] {
  const normalized = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return [...new Set(normalized)];
}

export function toAchievementSkillConnections(skills: SkillRecord[]) {
  return skills.map((skill) => ({ skillId: skill.id }));
}

export function toEntry(a: AchievementWithRelations): DiaryEntry {
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
