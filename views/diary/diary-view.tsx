"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/shared/components/button/button";
import styles from "./diary-view.module.css";

type DiaryEntry = {
  id: string;
  dateISO: string; // YYYY-MM-DD
  achievement: string;
  skills: string[];
};

function todayISO() {
  const d = new Date();
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function newId() {
  // Prefer crypto.randomUUID when available (browser), otherwise fallback.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function DiaryView({ label }: { label: string }) {
  const [achievement, setAchievement] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const skillsPreview = useMemo(() => {
    return skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [skillsInput]);

  function submitEntry(e: FormEvent) {
    e.preventDefault();

    const trimmedAchievement = achievement.trim();
    const trimmedSkills = skillsPreview;

    if (!trimmedAchievement) return;

    setEntries((prev) => [
      {
        id: newId(),
        dateISO: todayISO(),
        achievement: trimmedAchievement,
        skills: trimmedSkills,
      },
      ...prev,
    ]);

    setAchievement("");
    setSkillsInput("");
  }

  return (
    <div className={styles.root}>
      <section className={styles.header} aria-labelledby="diary-title">
        <h1 id="diary-title" className={styles.title}>
          Diary
        </h1>
        <p className={styles.subtitle}>
          Signed in as {label}. Capture what you shipped and the skills you
          strengthened today.
        </p>
      </section>

      <section className={styles.card} aria-labelledby="add-entry-title">
        <h2 id="add-entry-title" className={styles.cardTitle}>
          Add an entry
        </h2>
        <form onSubmit={submitEntry} className={styles.form}>
          <label className={styles.label}>
            <span className={styles.labelText}>Today&apos;s achievement</span>
            <textarea
              className={styles.textarea}
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              placeholder="Example: Fixed a performance regression in the search results page by caching computed filters..."
              rows={5}
              required
            />
          </label>

          <label className={styles.label}>
            <span className={styles.labelText}>
              Skills improved (comma-separated)
            </span>
            <input
              className={styles.input}
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="Example: React, TypeScript, Performance"
            />
          </label>

          {skillsPreview.length > 0 ? (
            <div className={styles.skillsPreview} aria-label="Skills preview">
              {skillsPreview.map((skill) => (
                <span key={skill} className={styles.skillChip}>
                  {skill}
                </span>
              ))}
            </div>
          ) : null}

          <div className={styles.actions}>
            <Button type="submit" variant="default" className={styles.button}>
              Add entry
            </Button>
          </div>
        </form>
      </section>

      <section className={styles.card} aria-labelledby="entries-title">
        <h2 id="entries-title" className={styles.cardTitle}>
          Your entries
        </h2>
        {entries.length === 0 ? (
          <p className={styles.empty}>
            No entries yet. Add your first achievement above.
          </p>
        ) : (
          <ul className={styles.entriesList}>
            {entries.map((entry) => (
              <li key={entry.id} className={styles.entry}>
                <div className={styles.entryMeta}>
                  <span className={styles.entryDate}>{entry.dateISO}</span>
                </div>
                <p className={styles.entryAchievement}>
                  {entry.achievement}
                </p>
                {entry.skills.length > 0 ? (
                  <div className={styles.entrySkills}>
                    {entry.skills.map((skill) => (
                      <span key={`${entry.id}-${skill}`} className={styles.skillChip}>
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

