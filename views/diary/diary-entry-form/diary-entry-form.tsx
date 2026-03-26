"use client";
import { useMemo } from "react";
import type { DiaryEntryDraft, ImportanceLevel } from "../diary-entry.types";
import { t } from "@/i18n/t";
import type { AppLocale } from "@/i18n/config";
import styles from "./diary-entry-form.module.css";
import { FormActions } from "@/shared/components/form-actions/form-actions";
import { Select } from "@/shared/components/select/select";
import { Combobox } from "@/shared/components/combobox/combobox";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RhfInputField } from "@/shared/forms/rhf-input-field";
import { RhfTextareaField } from "@/shared/forms/rhf-textarea-field";
import { RhfControllerField } from "@/shared/forms/rhf-controller-field";
import { createDiaryEntryFormSchema } from "./diary-entry-form.schema";

type DiaryEntryFormProps = {
  locale: AppLocale;
  mode: "create" | "edit";
  initialValues: DiaryEntryDraft;
  onCancel: () => void;
  onSubmit: (draft: DiaryEntryDraft) => void;
};

type DiaryEntryFormValues = {
  date: string;
  title: string;
  details: string;
  selectedSkills: string[];
  importance: ImportanceLevel;
};

function parseSkills(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const SKILL_OPTIONS = [
  { value: "React", label: "React" },
  { value: "Product thinking", label: "Product thinking" },
  { value: "SQL", label: "SQL" },
  { value: "Performance optimization", label: "Performance optimization" },
  { value: "API design", label: "API design" },
  { value: "Technical writing", label: "Technical writing" },
];

export function DiaryEntryForm({
  locale,
  mode,
  initialValues,
  onCancel,
  onSubmit,
}: DiaryEntryFormProps) {
  const formSchema = createDiaryEntryFormSchema(locale);

  const methods = useForm<DiaryEntryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: initialValues.date,
      title: initialValues.title,
      details: initialValues.details,
      selectedSkills: parseSkills(initialValues.skills),
      importance: initialValues.importance,
    },
  });

  const selectedSkills = useWatch({
    control: methods.control,
    name: "selectedSkills",
    defaultValue: parseSkills(initialValues.skills),
  });

  const importanceLabel = (level: ImportanceLevel) =>
    t(locale, `page.diary.importance.${level}`);

  const skillOptions = useMemo(() => {
    const baseValues = new Set(SKILL_OPTIONS.map((o) => o.value));
    const extras = selectedSkills
      .filter((v) => !baseValues.has(v))
      .map((v) => ({ value: v, label: v }));
    return [...SKILL_OPTIONS, ...extras];
  }, [selectedSkills]);

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={methods.handleSubmit((data) => {
          const draft: DiaryEntryDraft = {
            date: data.date.trim(),
            title: data.title.trim(),
            details: data.details.trim(),
            skills: data.selectedSkills.join(", "),
            importance: data.importance,
          };
          onSubmit(draft);
        })}
      >
      <RhfInputField
        name="date"
        label={t(locale, "page.diary.form.fields.date")}
        inputProps={{ type: "date" }}
      />

      <RhfInputField
        name="title"
        label={t(locale, "page.diary.form.fields.title")}
        inputProps={{
          placeholder:
            mode === "create"
              ? t(locale, "page.diary.form.placeholders.titleCreate")
              : t(locale, "page.diary.form.placeholders.titleEdit"),
        }}
      />

      <RhfTextareaField
        name="details"
        label={t(locale, "page.diary.form.fields.details")}
        textareaProps={{
          rows: 4,
          placeholder: t(locale, "page.diary.form.placeholders.details"),
        }}
      />

      <RhfControllerField
        name="selectedSkills"
        label={t(locale, "page.diary.form.fields.skills")}
        render={(field) => (
          <Combobox
            label={t(locale, "page.diary.form.fields.skills")}
            options={skillOptions}
            values={field.value as string[]}
            onChange={field.onChange}
            placeholder={t(locale, "page.diary.form.placeholders.skills")}
          />
        )}
      />

      <RhfControllerField
        name="importance"
        label={t(locale, "page.diary.form.fields.importance")}
        render={(field) => (
          <Select
            label={t(locale, "page.diary.form.fields.importance")}
            options={[
              { value: "low", label: importanceLabel("low") },
              { value: "medium", label: importanceLabel("medium") },
              { value: "high", label: importanceLabel("high") },
            ]}
            value={field.value as ImportanceLevel}
            onChange={(value) => field.onChange(value as ImportanceLevel)}
          />
        )}
      />

      <FormActions
        cancelLabel={t(locale, "page.diary.form.actions.cancel")}
        submitLabel={t(locale, "page.diary.form.actions.save")}
        onCancel={onCancel}
      />
      </form>
    </FormProvider>
  );
}

