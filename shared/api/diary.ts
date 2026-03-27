import type { DiaryEntry, DiaryEntryDraft } from "@/views/diary/diary-entry.types";
import { executeAction, parseApiResponse } from "@/shared/api/utils";

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

type DiaryActionCallbacks = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  onSettled?: () => void;
};

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
