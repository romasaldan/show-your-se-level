"use client";

import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { Button } from "@/shared/components/button/button";
import type { ProfileProject } from "../../profile.types";
import styles from "./profile-project-list-item.module.css";

type ProfileProjectListItemProps = {
  locale: AppLocale;
  project: ProfileProject;
  isFirst: boolean;
  isSaving: boolean;
  deletingProjectId: string | null;
  onEditProject: (projectId: string) => void;
  onDeleteProject: (project: ProfileProject) => void;
};

export function ProfileProjectListItem({
  locale,
  project,
  isFirst,
  isSaving,
  deletingProjectId,
  onEditProject,
  onDeleteProject,
}: ProfileProjectListItemProps) {
  const isPartiallyEditable = project.isDefault || project.kind === "general";

  return (
    <li
      className={`${styles.projectListItem}${isFirst ? ` ${styles.first}` : ""}`}
    >
      <div>
        <p className={styles.projectName}>{project.name}</p>
        <p className={styles.projectMeta}>
          {t(locale, "page.profile.projects.kind.label")}:{" "}
          {t(locale, `page.profile.projects.kind.${project.kind}`)}
        </p>
        <p className={styles.projectMeta}>
          {t(locale, "page.profile.projects.skills.label")}:{" "}
          {project.skills.length > 0
            ? project.skills.join(", ")
            : t(locale, "page.profile.projects.skills.empty")}
        </p>
      </div>

      <div className={styles.projectActions}>
        <Button
          type="button"
          variant="ghost"
          onClick={() => onEditProject(project.id)}
          disabled={isSaving || deletingProjectId === project.id}
        >
          {t(locale, "page.profile.projects.actions.edit")}
        </Button>
        {!isPartiallyEditable && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onDeleteProject(project)}
            disabled={isSaving || deletingProjectId === project.id}
          >
            {t(locale, "page.profile.projects.actions.delete")}
          </Button>
        )}
      </div>
    </li>
  );
}
