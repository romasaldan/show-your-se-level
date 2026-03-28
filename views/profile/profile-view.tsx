"use client";

import { useState } from "react";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { useEditModalState } from "@/shared/hooks/use-edit-modal-state";
import { findById } from "@/shared/utils/find-by-id";
import { ProfileIdentitySection } from "./identity-section/profile-identity-section";
import { useProfileProjectActions } from "./hooks/use-profile-project-actions";
import { ProfileProjectFormModal } from "./project-modal/profile-project-form-modal";
import { ProfileProjectList } from "./project-list/profile-project-list";
import { ProfileSkillsList } from "./skills-list/profile-skills-list";
import type { ProfileIdentity, ProfileProject, ProjectDraft } from "./profile.types";
import styles from "./profile-view.module.css";

type ProfileViewProps = {
  locale: AppLocale;
  identity: ProfileIdentity;
  initialProjects: ProfileProject[];
  initialEncounteredSkills: string[];
  availableSkills: string[];
};

export function ProfileView({
  locale,
  identity,
  initialProjects,
  initialEncounteredSkills,
  availableSkills,
}: ProfileViewProps) {
  const [projects, setProjects] = useState<ProfileProject[]>(initialProjects);
  const [encounteredSkills, setEncounteredSkills] = useState<string[]>(
    initialEncounteredSkills,
  );
  const {
    isModalOpen: isProjectModalOpen,
    editingId: editingProjectId,
    closeModal,
    openCreateModal,
    openEditModal,
  } = useEditModalState<string>();

  const title = t(locale, "page.profile.title");
  const subtitle = t(locale, "page.profile.signedInAs", {
    label: identity.name ?? identity.email ?? identity.githubLogin,
  });

  const deleteConfirmLabel = t(locale, "page.profile.projects.confirm.delete");
  const saveErrorLabel = t(locale, "page.profile.projects.toast.saveFailed");
  const deleteErrorLabel = t(locale, "page.profile.projects.toast.deleteFailed");

  const editingProject = findById(projects, editingProjectId);

  const modalMode: "create" | "edit" = editingProject ? "edit" : "create";

  const modalInitialValues: ProjectDraft = editingProject
    ? {
        name: editingProject.name,
        kind: editingProject.kind === "general" ? "personal" : editingProject.kind,
        skillNames: editingProject.skills,
      }
    : {
        name: "",
        kind: "personal",
        skillNames: [],
      };

  const projectSkillOptions = [...availableSkills].sort((a, b) =>
    a.localeCompare(b),
  );

  const sortedEncounteredSkills = [...encounteredSkills].sort((a, b) =>
    a.localeCompare(b),
  );

  const { isSaving, deletingProjectId, onSaveProject, onDeleteProject } =
    useProfileProjectActions({
      editingProjectId,
      closeModal,
      saveErrorLabel,
      deleteErrorLabel,
      deleteConfirmLabel,
      generalImmutableErrorLabel: t(
        locale,
        "page.profile.projects.errors.generalImmutable",
      ),
      setProjects,
      setEncounteredSkills,
    });

  return (
    <div className={styles.root}>
      <section className={styles.header} aria-labelledby="profile-title">
        <h1 id="profile-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </section>

      <ProfileIdentitySection locale={locale} identity={identity} />

      <ProfileProjectList
        locale={locale}
        projects={projects}
        isSaving={isSaving}
        deletingProjectId={deletingProjectId}
        onCreateProject={openCreateModal}
        onEditProject={openEditModal}
        onDeleteProject={onDeleteProject}
      />

      <ProfileSkillsList locale={locale} skills={sortedEncounteredSkills} />

      <ProfileProjectFormModal
        open={isProjectModalOpen}
        locale={locale}
        mode={modalMode}
        initialValues={modalInitialValues}
        skillOptions={projectSkillOptions}
        onClose={closeModal}
        onSave={onSaveProject}
      />
    </div>
  );
}
