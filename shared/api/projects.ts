import { executeAction, parseApiResponse } from "@/shared/api/utils";
import type { ProfileProject, ProjectDraft } from "@/views/profile/profile.types";

export async function createProject(draft: ProjectDraft): Promise<ProfileProject> {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });

  return parseApiResponse<ProfileProject>(response, "Failed to create project");
}

export async function updateProject(
  projectId: string,
  draft: ProjectDraft,
): Promise<ProfileProject> {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });

  return parseApiResponse<ProfileProject>(response, "Failed to update project");
}

type DeleteProjectResponse = {
  id: string;
};

export async function deleteProject(projectId: string): Promise<DeleteProjectResponse> {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE",
  });

  return parseApiResponse<DeleteProjectResponse>(response, "Failed to delete project");
}

type ProjectActionCallbacks = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  onSettled?: () => void;
};

type CreateProjectActionParams = ProjectActionCallbacks & {
  draft: ProjectDraft;
  onCreated: (project: ProfileProject) => void;
};

export async function createProjectAction({
  draft,
  onCreated,
  onSuccess,
  onError,
  onSettled,
}: CreateProjectActionParams): Promise<void> {
  await executeAction({
    run: () => createProject(draft),
    onResolved: onCreated,
    onSuccess,
    onError,
    onSettled,
    fallbackErrorMessage: "Failed to create project",
  });
}

type UpdateProjectActionParams = ProjectActionCallbacks & {
  projectId: string;
  draft: ProjectDraft;
  onUpdated: (project: ProfileProject) => void;
};

export async function updateProjectAction({
  projectId,
  draft,
  onUpdated,
  onSuccess,
  onError,
  onSettled,
}: UpdateProjectActionParams): Promise<void> {
  await executeAction({
    run: () => updateProject(projectId, draft),
    onResolved: onUpdated,
    onSuccess,
    onError,
    onSettled,
    fallbackErrorMessage: "Failed to update project",
  });
}

type DeleteProjectActionParams = ProjectActionCallbacks & {
  projectId: string;
  onDeleted: (projectId: string) => void;
};

export async function deleteProjectAction({
  projectId,
  onDeleted,
  onSuccess,
  onError,
  onSettled,
}: DeleteProjectActionParams): Promise<void> {
  await executeAction({
    run: () => deleteProject(projectId),
    onResolved: (result) => onDeleted(result.id),
    onSuccess,
    onError,
    onSettled,
    fallbackErrorMessage: "Failed to delete project",
  });
}
