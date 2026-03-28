"use client";

import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import styles from "./profile-skills-list.module.css";

type ProfileSkillsListProps = {
  locale: AppLocale;
  skills: string[];
};

export function ProfileSkillsList({ locale, skills }: ProfileSkillsListProps) {
  return (
    <section className={styles.skills} aria-labelledby="profile-skills-title">
      <h2 id="profile-skills-title" className={styles.sectionTitle}>
        {t(locale, "page.profile.skills.heading")}
      </h2>

      {skills.length === 0 ? (
        <p>{t(locale, "page.profile.skills.empty")}</p>
      ) : (
        <ul className={styles.skillList}>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
