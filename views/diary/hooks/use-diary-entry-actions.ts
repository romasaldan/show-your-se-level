"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";
import {
  createDiaryEntryAction,
  deleteDiaryEntryAction,
  updateDiaryEntryAction,
} from "@/shared/api/diary";
import type { DiaryEntry, DiaryEntryDraft } from "../diary-entry.types";

type UseDiaryEntryActionsParams = {
  editingEntryId: string | null;
  closeModal: () => void;
  saveErrorLabel: string;
  deleteErrorLabel: string;
  deleteConfirmLabel: string;
  setEntries: Dispatch<SetStateAction<DiaryEntry[]>>;
};

export function useDiaryEntryActions({
  editingEntryId,
  closeModal,
  saveErrorLabel,
  deleteErrorLabel,
  deleteConfirmLabel,
  setEntries,
}: UseDiaryEntryActionsParams) {
  const [isSaving, setIsSaving] = useState(false);
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);

  const onSaveDraft = async (draft: DiaryEntryDraft) => {
    setIsSaving(true);
    if (editingEntryId) {
      await updateDiaryEntryAction({
        entryId: editingEntryId,
        draft,
        onUpdated: (updated) =>
          setEntries((prev) => prev.map((entry) => (entry.id === updated.id ? updated : entry))),
        onSuccess: closeModal,
        onError: (message) => toast.error(message || saveErrorLabel),
        onSettled: () => setIsSaving(false),
      });
      return;
    }

    await createDiaryEntryAction({
      draft,
      onCreated: (created) => setEntries((prev) => [created, ...prev]),
      onSuccess: closeModal,
      onError: (message) => toast.error(message || saveErrorLabel),
      onSettled: () => setIsSaving(false),
    });
  };

  const onDeleteEntry = async (entryId: string) => {
    if (deletingEntryId) return;
    if (!window.confirm(deleteConfirmLabel)) return;

    setDeletingEntryId(entryId);
    await deleteDiaryEntryAction({
      entryId,
      onDeleted: (deletedId) => {
        setEntries((prev) => prev.filter((entry) => entry.id !== deletedId));
        if (editingEntryId === deletedId) {
          closeModal();
        }
      },
      onError: (message) => toast.error(message || deleteErrorLabel),
      onSettled: () => setDeletingEntryId(null),
    });
  };

  return {
    isSaving,
    deletingEntryId,
    onSaveDraft,
    onDeleteEntry,
  };
}
