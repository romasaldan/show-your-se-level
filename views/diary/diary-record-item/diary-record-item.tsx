import { CardContainer } from "@/shared/components/card-container/card-container";
import styles from "./diary-record-item.module.css";

type DiaryRecordItemProps = {
  entry: {
    id: string;
    date: string;
    title: string;
    details: string;
    skills: string;
    importance: string;
  };
};

export function DiaryRecordItem({ entry }: DiaryRecordItemProps) {
  return (
    <CardContainer as="article" className={styles.root}>
      <p className={styles.entryDate}>{entry.date}</p>
      <h3 className={styles.entryTitle}>{entry.title}</h3>
      <p className={styles.entryDetails}>{entry.details}</p>
      <p className={styles.entrySkills}>{entry.skills}</p>
      <p className={styles.entryImportance}>{entry.importance}</p>
    </CardContainer>
  );
}
