"use client";

import styles from "./diary-view.module.css";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import {
  createDiaryEntryAction,
  deleteDiaryEntryAction,
  updateDiaryEntryAction,
} from "@/shared/api/diary";
import { Button } from "@/shared/components/button/button";
import { DiaryRecordItem } from "./diary-record-item/diary-record-item";
import type {
  DiaryEntry,
  DiaryEntryDraft,
  ImportanceLevel,
  ProjectOption,
} from "./diary-entry.types";

import { DiaryEntryFormModal } from "./diary-entry-form-modal/diary-entry-form-modal";

export function DiaryView({
  label,
  locale,
  initialEntries,
  projects,
  skills,
}: {
  label: string;
  locale: AppLocale;
  initialEntries: DiaryEntry[];
  projects: ProjectOption[];
  skills: string[];
}) {
  const title = t(locale, "page.diary.title");
  const subtitle = t(locale, "page.diary.subtitle", { label });
  const addEntryLabel = t(locale, "page.diary.addEntry");
  const entriesHeading = t(locale, "page.diary.entriesHeading");
  const saveErrorLabel = t(locale, "page.diary.toast.saveFailed");
  const deleteErrorLabel = t(locale, "page.diary.toast.deleteFailed");
  const deleteConfirmLabel = t(locale, "page.diary.confirm.delete");

  const [entries, setEntries] = useState<DiaryEntry[]>(initialEntries);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);

  const defaultProject = projects.find((p) => p.isDefault) ?? projects[0];

  const defaultDraft: DiaryEntryDraft = {
    projectId: defaultProject?.id ?? "",
    date: "",
    title: "",
    details: "",
    skills: "",
    importance: "medium" satisfies ImportanceLevel,
  };

  const editingEntry = useMemo(
    () => (editingEntryId ? entries.find((e) => e.id === editingEntryId) : null),
    [entries, editingEntryId],
  );

  const modalMode: "create" | "edit" = editingEntry ? "edit" : "create";

  const modalInitialValues: DiaryEntryDraft = editingEntry
    ? {
        projectId: editingEntry.projectId,
        date: editingEntry.date,
        title: editingEntry.title,
        details: editingEntry.details,
        skills: editingEntry.skills,
        importance: editingEntry.importance,
      }
    : defaultDraft;

  const closeModal = () => {
    setIsEntryModalOpen(false);
    setEditingEntryId(null);
  };

  const openCreateModal = () => {
    setEditingEntryId(null);
    setIsEntryModalOpen(true);
  };

  const openEditModal = (entryId: string) => {
    setEditingEntryId(entryId);
    setIsEntryModalOpen(true);
  };

  const onSaveDraft = async (draft: DiaryEntryDraft) => {
    setIsSaving(true);
    if (editingEntryId) {
      await updateDiaryEntryAction({
        entryId: editingEntryId,
        draft,
        onUpdated: (updated) =>
          setEntries((prev) => prev.map((e) => (e.id === updated.id ? updated : e))),
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

  return (
    <div className={styles.root}>
      <section className={styles.header} aria-labelledby="diary-title">
        <h1 id="diary-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.subtitle}>
          {subtitle}
        </p>
      </section>

      <Button
        type="button"
        onClick={openCreateModal}
        className={styles.addEntryButton}
        disabled={isSaving}
      >
        {addEntryLabel}
      </Button>

      <section className={styles.entries} aria-labelledby="diary-entries-title">
        <h2 id="diary-entries-title" className={styles.entriesTitle}>
          {entriesHeading}
        </h2>

        <div className={styles.entriesGrid}>
          {entries.map((entry) => (
            <DiaryRecordItem
              key={entry.id}
              entry={entry}
              locale={locale}
              onEdit={openEditModal}
              onDelete={onDeleteEntry}
            />
          ))}
        </div>
      </section>

      <DiaryEntryFormModal
        open={isEntryModalOpen}
        locale={locale}
        mode={modalMode}
        initialValues={modalInitialValues}
        projects={projects}
        skills={skills}
        onClose={closeModal}
        onSave={onSaveDraft}
      />
    </div>
  );
}
