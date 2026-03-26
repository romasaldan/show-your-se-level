import { CardContainer } from "@/shared/components/card-container/card-container";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import type { DiaryEntry } from "../diary-entry.types";
import { Button } from "@/shared/components/button/button";
import styles from "./diary-record-item.module.css";

type DiaryRecordItemProps = {
  entry: DiaryEntry;
  locale: AppLocale;
  onEdit?: (entryId: string) => void;
};

export function DiaryRecordItem({ entry, locale, onEdit }: DiaryRecordItemProps) {
  const importanceValue = t(locale, `page.diary.importance.${entry.importance}`);
  const importanceText = `${t(locale, "page.diary.importance.prefix")}: ${importanceValue}`;
  const skillsText = `${t(locale, "page.diary.skills.prefix")}: ${entry.skills}`;

  const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(entry.date);
  const dateText = isIsoDate
    ? new Date(`${entry.date}T00:00:00`).toLocaleDateString(
        locale === "uk" ? "uk-UA" : "en-US",
        { year: "numeric", month: "short", day: "numeric" },
      )
    : entry.date;

  return (
    <CardContainer as="article" className={styles.root}>
      <p className={styles.entryDate}>{dateText}</p>
      <h3 className={styles.entryTitle}>{entry.title}</h3>
      <p className={styles.entryDetails}>{entry.details}</p>
      <p className={styles.entrySkills}>{skillsText}</p>
      <p className={styles.entryImportance}>{importanceText}</p>

      {onEdit ? (
        <div className={styles.actions}>
          <Button
            type="button"
            variant="ghost"
            className={styles.editButton}
            onClick={() => onEdit(entry.id)}
          >
            {t(locale, "page.diary.record.edit")}
          </Button>
        </div>
      ) : null}
    </CardContainer>
  );
}
