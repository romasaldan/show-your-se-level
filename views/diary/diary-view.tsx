"use client";

import styles from "./diary-view.module.css";

import { useMemo, useState } from "react";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { Button } from "@/shared/components/button/button";
import { DiaryRecordItem } from "./diary-record-item/diary-record-item";
import type {
  DiaryEntry,
  DiaryEntryDraft,
  ImportanceLevel,
} from "./diary-entry.types";
import { DiaryEntryFormModal } from "./diary-entry-form-modal/diary-entry-form-modal";

export function DiaryView({
  label,
  locale,
}: {
  label: string;
  locale: AppLocale;
}) {
  const title = t(locale, "page.diary.title");
  const subtitle = t(locale, "page.diary.subtitle", { label });
  const addEntryLabel = t(locale, "page.diary.addEntry");
  const entriesHeading = t(locale, "page.diary.entriesHeading");

  const initialEntries: DiaryEntry[] = useMemo(
    () => [
      {
        id: "entry-1",
        date: t(locale, "page.diary.entry1.date"),
        title: t(locale, "page.diary.entry1.title"),
        details: t(locale, "page.diary.entry1.details"),
        skills: t(locale, "page.diary.entry1.skills"),
        importance: "high" satisfies ImportanceLevel,
      },
      {
        id: "entry-2",
        date: t(locale, "page.diary.entry2.date"),
        title: t(locale, "page.diary.entry2.title"),
        details: t(locale, "page.diary.entry2.details"),
        skills: t(locale, "page.diary.entry2.skills"),
        importance: "medium" satisfies ImportanceLevel,
      },
      {
        id: "entry-3",
        date: t(locale, "page.diary.entry3.date"),
        title: t(locale, "page.diary.entry3.title"),
        details: t(locale, "page.diary.entry3.details"),
        skills: t(locale, "page.diary.entry3.skills"),
        importance: "high" satisfies ImportanceLevel,
      },
    ],
    [locale],
  );

  const [entries, setEntries] = useState<DiaryEntry[]>(initialEntries);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  const defaultDraft: DiaryEntryDraft = useMemo(
    () => ({
      date: "",
      title: "",
      details: "",
      skills: "",
      importance: "medium" satisfies ImportanceLevel,
    }),
    [],
  );

  const editingEntry = useMemo(
    () => (editingEntryId ? entries.find((e) => e.id === editingEntryId) : null),
    [entries, editingEntryId],
  );

  const modalMode: "create" | "edit" = editingEntry ? "edit" : "create";

  const modalInitialValues: DiaryEntryDraft = editingEntry
    ? {
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

  const onSaveDraft = (draft: DiaryEntryDraft) => {
    if (editingEntryId) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === editingEntryId ? { ...e, ...draft } : e,
        ),
      );
    } else {
      const newId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setEntries((prev) => [{ id: newId, ...draft }, ...prev]);
    }
    closeModal();
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
            />
          ))}
        </div>
      </section>

      <DiaryEntryFormModal
        open={isEntryModalOpen}
        locale={locale}
        mode={modalMode}
        initialValues={modalInitialValues}
        onClose={closeModal}
        onSave={onSaveDraft}
      />
    </div>
  );
}
