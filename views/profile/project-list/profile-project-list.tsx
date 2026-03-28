"use client";

import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { Button } from "@/shared/components/button/button";
import type { ProfileProject } from "../profile.types";
import { ProfileProjectListItem } from "./project-list-item/profile-project-list-item";
import styles from "./profile-project-list.module.css";

type ProfileProjectListProps = {
  locale: AppLocale;
  projects: ProfileProject[];
  isSaving: boolean;
  deletingProjectId: string | null;
  onCreateProject: () => void;
  onEditProject: (projectId: string) => void;
  onDeleteProject: (project: ProfileProject) => void;
};

export function ProfileProjectList({
  locale,
  projects,
  isSaving,
  deletingProjectId,
  onCreateProject,
  onEditProject,
  onDeleteProject,
}: ProfileProjectListProps) {
  return (
    <section className={styles.projects} aria-labelledby="profile-projects-title">
      <div className={styles.projectsHeader}>
        <h2 id="profile-projects-title" className={styles.sectionTitle}>
          {t(locale, "page.profile.projects.heading")}
        </h2>
        <Button type="button" onClick={onCreateProject} disabled={isSaving}>
          {t(locale, "page.profile.projects.createButton")}
        </Button>
      </div>

      {projects.length === 0 ? (
        <p>{t(locale, "page.profile.projects.empty")}</p>
      ) : (
        <ul className={styles.projectList}>
          {projects.map((project, index) => (
            <ProfileProjectListItem
              key={project.id}
              locale={locale}
              project={project}
              isFirst={index === 0}
              isSaving={isSaving}
              deletingProjectId={deletingProjectId}
              onEditProject={onEditProject}
              onDeleteProject={onDeleteProject}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
