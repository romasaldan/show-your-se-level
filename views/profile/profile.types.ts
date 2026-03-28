export type ProjectKind = "general" | "company" | "personal";

export type EditableProjectKind = Exclude<ProjectKind, "general">;

export type ProfileIdentity = {
  githubLogin: string;
  githubUrl: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
};

export type ProfileProject = {
  id: string;
  name: string;
  kind: ProjectKind;
  isDefault: boolean;
  skills: string[];
};

export type ProjectDraft = {
  name: string;
  kind: EditableProjectKind;
  skillNames: string[];
};
