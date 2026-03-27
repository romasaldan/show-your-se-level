"use client";
import type { DiaryEntryDraft, ImportanceLevel, ProjectOption } from "../diary-entry.types";
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
import { DatePicker } from "@/shared/components/date-picker/date-picker";
import { createDiaryEntryFormSchema } from "./diary-entry-form.schema";

type DiaryEntryFormProps = {
  locale: AppLocale;
  mode: "create" | "edit";
  initialValues: DiaryEntryDraft;
  projects: ProjectOption[];
  skills: string[];
  onCancel: () => void;
  onSubmit: (draft: DiaryEntryDraft) => void;
};

type DiaryEntryFormValues = {
  projectId: string;
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

export function DiaryEntryForm({
  locale,
  mode,
  initialValues,
  projects,
  skills,
  onCancel,
  onSubmit,
}: DiaryEntryFormProps) {
  const formSchema = createDiaryEntryFormSchema(locale);

  const methods = useForm<DiaryEntryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: initialValues.projectId,
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

  const baseSkillValues = new Set(skills);
  const skillOptions = [
    ...skills.map((name) => ({ value: name, label: name })),
    ...selectedSkills
      .filter((v) => !baseSkillValues.has(v))
      .map((v) => ({ value: v, label: v })),
  ];

  const projectOptions = projects.map((p) => ({ value: p.id, label: p.name }));

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={methods.handleSubmit((data) => {
          const draft: DiaryEntryDraft = {
            projectId: data.projectId,
            date: data.date.trim(),
            title: data.title.trim(),
            details: data.details.trim(),
            skills: data.selectedSkills.join(", "),
            importance: data.importance,
          };
          onSubmit(draft);
        })}
      >
        <RhfControllerField
          name="projectId"
          label={t(locale, "page.diary.form.fields.project")}
          render={(field) => (
            <Select
              label={t(locale, "page.diary.form.fields.project")}
              options={projectOptions}
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        />

        <RhfControllerField
          name="date"
          label={t(locale, "page.diary.form.fields.date")}
          render={(field) => (
            <DatePicker
              value={field.value as string}
              onChange={field.onChange}
              placeholder={t(locale, "page.diary.form.fields.date")}
              locale={locale}
            />
          )}
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
