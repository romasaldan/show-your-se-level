"use client";

import styles from "./diary-view.module.css";

import { useCallback, useState } from "react";
import type { AppLocale } from "@/i18n/config";
import { useEditModalState } from "@/shared/hooks/use-edit-modal-state";
import { findById } from "@/shared/utils/find-by-id";
import { mergeUnique } from "@/shared/utils/merge-unique";
import { Button } from "@/shared/components/button/button";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { listDiaryEntriesAction } from "@/shared/api/diary";
import { useDiaryEntryActions } from "./hooks/use-diary-entry-actions";
import { useDiaryViewLabels } from "./hooks/use-diary-view-labels";
import {
  DiaryFilters,
  type DiaryFiltersFormValues,
} from "./diary-filters/diary-filters";
import { DiaryRecordItem } from "./diary-record-item/diary-record-item";
import type {
  DiaryEntry,
  DiaryEntriesFilter,
  DiaryEntryDraft,
  ImportanceLevel,
  ProjectOption,
} from "./diary-entry.types";

import { DiaryEntryFormModal } from "./diary-entry-form-modal/diary-entry-form-modal";

const defaultFilterValues: DiaryFiltersFormValues = {
  projectId: null,
  skills: [],
  fromDate: "",
  toDate: "",
};

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
  const {
    title,
    subtitle,
    addEntryLabel,
    entriesHeading,
    noEntriesLabel,
    loadErrorLabel,
    saveErrorLabel,
    deleteErrorLabel,
    deleteConfirmLabel,
  } = useDiaryViewLabels({ locale, label });

  const [entries, setEntries] = useState<DiaryEntry[]>(initialEntries);
  const [availableSkills, setAvailableSkills] = useState<string[]>(skills);
  const filterMethods = useForm<DiaryFiltersFormValues>({
    defaultValues: defaultFilterValues,
  });

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

  const fetchEntries = useCallback(async (filters: DiaryEntriesFilter) => {
    await listDiaryEntriesAction({
      filters,
      onListed: setEntries,
      onError: (message) => toast.error(message || loadErrorLabel),
    });
  }, [loadErrorLabel]);

  const refreshEntries = useCallback(async () => {
    const appliedFormValues =
      (filterMethods.formState.defaultValues as DiaryFiltersFormValues | undefined) ??
      defaultFilterValues;
    await fetchEntries(appliedFormValues);
  }, [fetchEntries, filterMethods.formState.defaultValues]);

  const { isSaving, onSaveDraft, onDeleteEntry } = useDiaryEntryActions({
    editingEntryId,
    closeModal,
    saveErrorLabel,
    deleteErrorLabel,
    deleteConfirmLabel,
    refreshEntries,
    onSavedDraft: (draft) => {
      const nextSkills = draft.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      setAvailableSkills((prev) => mergeUnique(prev, nextSkills));
    },
  });

  const onChangeFilters = useCallback(
    async (nextFilters: DiaryEntriesFilter) => {
      filterMethods.reset(nextFilters);
      await fetchEntries(nextFilters);
    },
    [fetchEntries, filterMethods],
  );

  return (
    <div className={styles.root}>
      <section className={styles.header} aria-labelledby="diary-title">
        <h1 id="diary-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </section>

      <Button
        type="button"
        onClick={openCreateModal}
        className={styles.addEntryButton}
        disabled={isSaving}
      >
        {addEntryLabel}
      </Button>

      <FormProvider {...filterMethods}>
        <DiaryFilters
          locale={locale}
          projects={projects}
          skills={availableSkills}
          onChangeFilters={onChangeFilters}
        />
      </FormProvider>

      <section className={styles.entries} aria-labelledby="diary-entries-title">
        <h2 id="diary-entries-title" className={styles.entriesTitle}>
          {entriesHeading}
        </h2>

        <div className={styles.entriesGrid}>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <DiaryRecordItem
                key={entry.id}
                entry={entry}
                locale={locale}
                onEdit={openEditModal}
                onDelete={onDeleteEntry}
              />
            ))
          ) : (
            <p className={styles.emptyState}>{noEntriesLabel}</p>
          )}
        </div>
      </section>

      <DiaryEntryFormModal
        open={isEntryModalOpen}
        locale={locale}
        mode={modalMode}
        initialValues={modalInitialValues}
        projects={projects}
        skills={availableSkills}
        onClose={closeModal}
        onSave={onSaveDraft}
      />
    </div>
  );
}
