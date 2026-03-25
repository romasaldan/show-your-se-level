"use client";

import styles from "./diary-view.module.css";

import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

export function DiaryView({
  label,
  locale,
}: {
  label: string;
  locale: AppLocale;
}) {
  const title = t(locale, "page.diary.title");
  const subtitle = t(locale, "page.diary.subtitle", { label });

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
    </div>
  );
}
