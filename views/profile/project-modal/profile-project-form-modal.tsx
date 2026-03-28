"use client";

import { useEffect } from "react";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { ModalWithDrawer } from "@/shared/components/modal-with-drawer/modal-with-drawer";
import { ProfileProjectForm } from "../project-form/profile-project-form";
import type { ProjectDraft } from "../profile.types";

type ProfileProjectFormModalProps = {
  open: boolean;
  locale: AppLocale;
  mode: "create" | "edit";
  initialValues: ProjectDraft;
  skillOptions: string[];
  onClose: () => void;
  onSave: (draft: ProjectDraft) => void;
};

export function ProfileProjectFormModal({
  open,
  locale,
  mode,
  initialValues,
  skillOptions,
  onClose,
  onSave,
}: ProfileProjectFormModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const title =
    mode === "create"
      ? t(locale, "page.profile.projects.form.title.create")
      : t(locale, "page.profile.projects.form.title.edit");

  return (
    <ModalWithDrawer open={open} title={title} onClose={onClose}>
      <ProfileProjectForm
        key={`${mode}-${initialValues.name}-${initialValues.kind}-${initialValues.skillNames.join(",")}`}
        locale={locale}
        mode={mode}
        initialValues={initialValues}
        skillOptions={skillOptions}
        onCancel={onClose}
        onSubmit={onSave}
      />
    </ModalWithDrawer>
  );
}
