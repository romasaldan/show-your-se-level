"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  createDiaryEntry,
  deleteDiaryEntry,
  updateDiaryEntry,
} from "@/shared/api/diary";
import type { DiaryEntryDraft } from "../diary-entry.types";

type UseDiaryEntryActionsParams = {
  editingEntryId: string | null;
  closeModal: () => void;
  saveErrorLabel: string;
  deleteErrorLabel: string;
  deleteConfirmLabel: string;
  refreshEntries: () => Promise<void>;
  onSavedDraft?: (draft: DiaryEntryDraft) => void;
};

export function useDiaryEntryActions({
  editingEntryId,
  closeModal,
  saveErrorLabel,
  deleteErrorLabel,
  deleteConfirmLabel,
  refreshEntries,
  onSavedDraft,
}: UseDiaryEntryActionsParams) {
  const [isSaving, setIsSaving] = useState(false);
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);

  const onSaveDraft = async (draft: DiaryEntryDraft) => {
    setIsSaving(true);
    try {
      if (editingEntryId) {
        await updateDiaryEntry(editingEntryId, draft);
      } else {
        await createDiaryEntry(draft);
      }

      await refreshEntries();
      onSavedDraft?.(draft);
      closeModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : saveErrorLabel;
      toast.error(message || saveErrorLabel);
    } finally {
      setIsSaving(false);
    }
  };

  const onDeleteEntry = async (entryId: string) => {
    if (deletingEntryId) return;
    if (!window.confirm(deleteConfirmLabel)) return;

    setDeletingEntryId(entryId);
    try {
      await deleteDiaryEntry(entryId);
      await refreshEntries();
      if (editingEntryId === entryId) {
        closeModal();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : deleteErrorLabel;
      toast.error(message || deleteErrorLabel);
    } finally {
      setDeletingEntryId(null);
    }
  };

  return {
    isSaving,
    deletingEntryId,
    onSaveDraft,
    onDeleteEntry,
  };
}
