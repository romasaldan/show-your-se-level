"use client";

import styles from "./diary-view.module.css";

import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { Button } from "@/shared/components/button/button";
import { DiaryRecordItem } from "./diary-record-item/diary-record-item";

type DiaryEntry = {
  id: string;
  date: string;
  title: string;
  details: string;
  skills: string;
  importance: string;
};

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

  const entries: DiaryEntry[] = [
    {
      id: "entry-1",
      date: t(locale, "page.diary.entry1.date"),
      title: t(locale, "page.diary.entry1.title"),
      details: t(locale, "page.diary.entry1.details"),
      skills: t(locale, "page.diary.entry1.skills"),
      importance: t(locale, "page.diary.entry1.importance"),
    },
    {
      id: "entry-2",
      date: t(locale, "page.diary.entry2.date"),
      title: t(locale, "page.diary.entry2.title"),
      details: t(locale, "page.diary.entry2.details"),
      skills: t(locale, "page.diary.entry2.skills"),
      importance: t(locale, "page.diary.entry2.importance"),
    },
    {
      id: "entry-3",
      date: t(locale, "page.diary.entry3.date"),
      title: t(locale, "page.diary.entry3.title"),
      details: t(locale, "page.diary.entry3.details"),
      skills: t(locale, "page.diary.entry3.skills"),
      importance: t(locale, "page.diary.entry3.importance"),
    },
  ];

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

      <Button type="button" className={styles.addEntryButton}>
        {addEntryLabel}
      </Button>

      <section className={styles.entries} aria-labelledby="diary-entries-title">
        <h2 id="diary-entries-title" className={styles.entriesTitle}>
          {entriesHeading}
        </h2>

        <div className={styles.entriesGrid}>
          {entries.map((entry) => (
            <DiaryRecordItem key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
