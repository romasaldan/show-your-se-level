"use client";

import styles from "./diary-view.module.css";

import { useState } from "react";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { useEditModalState } from "@/shared/hooks/use-edit-modal-state";
import { findById } from "@/shared/utils/find-by-id";
import { Button } from "@/shared/components/button/button";
import { useDiaryEntryActions } from "./hooks/use-diary-entry-actions";
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
  const {
    isModalOpen: isEntryModalOpen,
    editingId: editingEntryId,
    closeModal,
    openCreateModal,
    openEditModal,
  } = useEditModalState<string>();

  const defaultProject = projects.find((p) => p.isDefault) ?? projects[0];

  const defaultDraft: DiaryEntryDraft = {
    projectId: defaultProject?.id ?? "",
    date: "",
    title: "",
    details: "",
    skills: "",
    importance: "medium" satisfies ImportanceLevel,
  };

  const editingEntry = findById(entries, editingEntryId);

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

  const { isSaving, onSaveDraft, onDeleteEntry } = useDiaryEntryActions({
    editingEntryId,
    closeModal,
    saveErrorLabel,
    deleteErrorLabel,
    deleteConfirmLabel,
    setEntries,
  });

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
