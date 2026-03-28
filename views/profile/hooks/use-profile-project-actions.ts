"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/shared/api/projects";
import { mergeUnique } from "@/shared/utils/merge-unique";
import { sortProjects } from "../utils/sort-projects";
import type { ProfileProject, ProjectDraft } from "../profile.types";

type UseProfileProjectActionsParams = {
  editingProjectId: string | null;
  closeModal: () => void;
  saveErrorLabel: string;
  deleteErrorLabel: string;
  deleteConfirmLabel: string;
  generalImmutableErrorLabel: string;
  setProjects: Dispatch<SetStateAction<ProfileProject[]>>;
  setEncounteredSkills: Dispatch<SetStateAction<string[]>>;
};

export function useProfileProjectActions({
  editingProjectId,
  closeModal,
  saveErrorLabel,
  deleteErrorLabel,
  deleteConfirmLabel,
  generalImmutableErrorLabel,
  setProjects,
  setEncounteredSkills,
}: UseProfileProjectActionsParams) {
  const [isSaving, setIsSaving] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const onSaveProject = async (draft: ProjectDraft) => {
    setIsSaving(true);

    if (editingProjectId) {
      await updateProjectAction({
        projectId: editingProjectId,
        draft,
        onUpdated: (updated) => {
          setProjects((prev) => prev.map((project) => (project.id === updated.id ? updated : project)));
          setEncounteredSkills((prev) => mergeUnique(prev, updated.skills));
        },
        onSuccess: closeModal,
        onError: (message) => toast.error(message || saveErrorLabel),
        onSettled: () => setIsSaving(false),
      });
      return;
    }

    await createProjectAction({
      draft,
      onCreated: (created) => {
        setProjects((prev) => sortProjects([created, ...prev]));
        setEncounteredSkills((prev) => mergeUnique(prev, created.skills));
      },
      onSuccess: closeModal,
      onError: (message) => toast.error(message || saveErrorLabel),
      onSettled: () => setIsSaving(false),
    });
  };

  const onDeleteProject = async (project: ProfileProject) => {
    if (project.isDefault || project.kind === "general") {
      toast.error(generalImmutableErrorLabel);
      return;
    }
    if (deletingProjectId) return;
    if (!window.confirm(deleteConfirmLabel)) return;

    setDeletingProjectId(project.id);
    await deleteProjectAction({
      projectId: project.id,
      onDeleted: (deletedId) => {
        setProjects((prev) => prev.filter((item) => item.id !== deletedId));
        if (editingProjectId === deletedId) {
          closeModal();
        }
      },
      onError: (message) => toast.error(message || deleteErrorLabel),
      onSettled: () => setDeletingProjectId(null),
    });
  };

  return {
    isSaving,
    deletingProjectId,
    onSaveProject,
    onDeleteProject,
  };
}
