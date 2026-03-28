import type { ProfileProject } from "../profile.types";

export function sortProjects(projects: ProfileProject[]): ProfileProject[] {
  return [...projects].sort((a, b) => {
    if (a.isDefault !== b.isDefault) {
      return a.isDefault ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}
