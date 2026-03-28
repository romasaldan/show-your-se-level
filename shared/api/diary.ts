import type {
  DiaryEntriesFilter,
  DiaryEntry,
  DiaryEntryDraft,
} from "@/views/diary/diary-entry.types";
import { executeAction, parseApiResponse } from "@/shared/api/utils";

function toDiaryFilterQuery(filters: DiaryEntriesFilter): string {
  const query = new URLSearchParams();

  if (filters.projectId) {
    query.set("projectId", filters.projectId);
  }
  if (filters.skills.length > 0) {
    query.set("skills", filters.skills.join(","));
  }
  if (filters.fromDate) {
    query.set("fromDate", filters.fromDate);
  }
  if (filters.toDate) {
    query.set("toDate", filters.toDate);
  }

  const serialized = query.toString();
  return serialized.length > 0 ? `?${serialized}` : "";
}

export async function listDiaryEntries(filters: DiaryEntriesFilter): Promise<DiaryEntry[]> {
  const response = await fetch(`/api/diary${toDiaryFilterQuery(filters)}`);
  return parseApiResponse<DiaryEntry[]>(response, "Failed to load entries");
}

export async function createDiaryEntry(draft: DiaryEntryDraft): Promise<DiaryEntry> {
  const response = await fetch("/api/diary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });

  return parseApiResponse<DiaryEntry>(response, "Failed to create entry");
}

export async function updateDiaryEntry(
  entryId: string,
  draft: DiaryEntryDraft,
): Promise<DiaryEntry> {
  const response = await fetch(`/api/diary/${entryId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });

  return parseApiResponse<DiaryEntry>(response, "Failed to update entry");
}

type DeleteDiaryEntryResponse = {
  id: string;
};

export async function deleteDiaryEntry(entryId: string): Promise<DeleteDiaryEntryResponse> {
  const response = await fetch(`/api/diary/${entryId}`, {
    method: "DELETE",
  });

  return parseApiResponse<DeleteDiaryEntryResponse>(response, "Failed to delete entry");
}

type DiaryActionCallbacks = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  onSettled?: () => void;
};

type ListDiaryEntriesActionParams = DiaryActionCallbacks & {
  filters: DiaryEntriesFilter;
  onListed: (entries: DiaryEntry[]) => void;
};

export async function listDiaryEntriesAction({
  filters,
  onListed,
  onSuccess,
  onError,
  onSettled,
}: ListDiaryEntriesActionParams): Promise<void> {
  await executeAction({
    run: () => listDiaryEntries(filters),
    onResolved: onListed,
    onSuccess,
    onError,
    onSettled,
    fallbackErrorMessage: "Failed to load entries",
  });
}

type CreateDiaryEntryActionParams = DiaryActionCallbacks & {
  draft: DiaryEntryDraft;
  onCreated: (entry: DiaryEntry) => void;
};

export async function createDiaryEntryAction({
  draft,
  onCreated,
  onSuccess,
  onError,
  onSettled,
}: CreateDiaryEntryActionParams): Promise<void> {
  await executeAction({
    run: () => createDiaryEntry(draft),
    onResolved: onCreated,
    onSuccess,
    onError,
    onSettled,
    fallbackErrorMessage: "Failed to create entry",
  });
}

type UpdateDiaryEntryActionParams = DiaryActionCallbacks & {
  entryId: string;
  draft: DiaryEntryDraft;
  onUpdated: (entry: DiaryEntry) => void;
};

export async function updateDiaryEntryAction({
  entryId,
  draft,
  onUpdated,
  onSuccess,
  onError,
  onSettled,
}: UpdateDiaryEntryActionParams): Promise<void> {
  await executeAction({
    run: () => updateDiaryEntry(entryId, draft),
    onResolved: onUpdated,
    onSuccess,
    onError,
    onSettled,
    fallbackErrorMessage: "Failed to update entry",
  });
}

type DeleteDiaryEntryActionParams = DiaryActionCallbacks & {
  entryId: string;
  onDeleted: (entryId: string) => void;
};

export async function deleteDiaryEntryAction({
  entryId,
  onDeleted,
  onSuccess,
  onError,
  onSettled,
}: DeleteDiaryEntryActionParams): Promise<void> {
  await executeAction({
    run: () => deleteDiaryEntry(entryId),
    onResolved: (result) => onDeleted(result.id),
    onSuccess,
    onError,
    onSettled,
    fallbackErrorMessage: "Failed to delete entry",
  });
}
