export type ImportanceLevel = "low" | "medium" | "high";

export type DiaryEntry = {
  id: string;
  date: string;
  title: string;
  details: string;
  skills: string;
  importance: ImportanceLevel;
};

export type DiaryEntryDraft = Omit<DiaryEntry, "id">;

