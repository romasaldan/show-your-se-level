"use client";
import { useEffect } from "react";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import type { DiaryEntryDraft } from "../diary-entry.types";
import { ModalWithDrawer } from "@/shared/components/modal-with-drawer/modal-with-drawer";
import { DiaryEntryForm } from "../diary-entry-form/diary-entry-form";

type DiaryEntryFormModalProps = {
  open: boolean;
  locale: AppLocale;
  mode: "create" | "edit";
  initialValues: DiaryEntryDraft;
  onClose: () => void;
  onSave: (draft: DiaryEntryDraft) => void;
};

export function DiaryEntryFormModal({
  open,
  locale,
  mode,
  initialValues,
  onClose,
  onSave,
}: DiaryEntryFormModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const title =
    mode === "create"
      ? t(locale, "page.diary.form.title.create")
      : t(locale, "page.diary.form.title.edit");

  return (
    <ModalWithDrawer open={open} title={title} onClose={onClose}>
      <DiaryEntryForm
        key={`${mode}-${initialValues.date}-${initialValues.title}-${initialValues.details}-${initialValues.skills}-${initialValues.importance}`}
        locale={locale}
        mode={mode}
        initialValues={initialValues}
        onCancel={onClose}
        onSubmit={onSave}
      />
    </ModalWithDrawer>
  );
}

