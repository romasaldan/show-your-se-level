export type ImportanceLevel = "low" | "medium" | "high";

export type ProjectKind = "general" | "company" | "personal";

export type ProjectOption = {
  id: string;
  name: string;
  kind: ProjectKind;
  isDefault: boolean;
  startDate: number | null;
  endDate: number | null;
};

export type DiaryEntry = {
  id: string;
  date: string;
  title: string;
  details: string;
  skills: string;
  importance: ImportanceLevel;
  projectId: string;
  projectName: string;
};

export type DiaryEntryDraft = Omit<DiaryEntry, "id" | "projectName">;

export type DiaryEntriesFilter = {
  projectId: string | null;
  skills: string[];
  fromDate: string;
  toDate: string;
};
