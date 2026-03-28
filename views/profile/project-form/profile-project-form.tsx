"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { FormActions } from "@/shared/components/form-actions/form-actions";
import { Select } from "@/shared/components/select/select";
import { Combobox } from "@/shared/components/combobox/combobox";
import { RhfControllerField } from "@/shared/forms/rhf-controller-field";
import { RhfInputField } from "@/shared/forms/rhf-input-field";
import type { ProjectDraft } from "../profile.types";
import { createProfileProjectFormSchema } from "./profile-project-form.schema";
import styles from "./profile-project-form.module.css";

type ProfileProjectFormProps = {
  locale: AppLocale;
  mode: "create" | "edit";
  initialValues: ProjectDraft;
  skillOptions: string[];
  onCancel: () => void;
  onSubmit: (draft: ProjectDraft) => void;
};

type ProfileProjectFormValues = {
  name: string;
  kind: "company" | "personal";
  selectedSkills: string[];
};

export function ProfileProjectForm({
  locale,
  mode,
  initialValues,
  skillOptions,
  onCancel,
  onSubmit,
}: ProfileProjectFormProps) {
  const formSchema = createProfileProjectFormSchema(locale);
  const methods = useForm<ProfileProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues.name,
      kind: initialValues.kind,
      selectedSkills: initialValues.skillNames,
    },
  });

  const selectedSkills = useWatch({
    control: methods.control,
    name: "selectedSkills",
    defaultValue: initialValues.skillNames,
  });

  const baseSkillValues = new Set(skillOptions);
  const comboboxOptions = [
    ...skillOptions.map((name) => ({ value: name, label: name })),
    ...selectedSkills
      .filter((value) => !baseSkillValues.has(value))
      .map((value) => ({ value, label: value })),
  ];

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={methods.handleSubmit((data) =>
          onSubmit({
            name: data.name.trim(),
            kind: data.kind,
            skillNames: data.selectedSkills,
          }),
        )}
      >
        <RhfInputField
          name="name"
          label={t(locale, "page.profile.projects.form.fields.name")}
          inputProps={{
            placeholder:
              mode === "create"
                ? t(locale, "page.profile.projects.form.placeholders.nameCreate")
                : t(locale, "page.profile.projects.form.placeholders.nameEdit"),
          }}
        />

        <RhfControllerField
          name="kind"
          label={t(locale, "page.profile.projects.form.fields.kind")}
          render={(field) => (
            <Select
              label={t(locale, "page.profile.projects.form.fields.kind")}
              options={[
                {
                  value: "company",
                  label: t(locale, "page.profile.projects.kind.company"),
                },
                {
                  value: "personal",
                  label: t(locale, "page.profile.projects.kind.personal"),
                },
              ]}
              value={field.value as "company" | "personal"}
              onChange={(value) => field.onChange(value as "company" | "personal")}
            />
          )}
        />

        <RhfControllerField
          name="selectedSkills"
          label={t(locale, "page.profile.projects.form.fields.skills")}
          render={(field) => (
            <Combobox
              label={t(locale, "page.profile.projects.form.fields.skills")}
              options={comboboxOptions}
              values={field.value as string[]}
              onChange={field.onChange}
              placeholder={t(locale, "page.profile.projects.form.placeholders.skills")}
            />
          )}
        />

        <FormActions
          cancelLabel={t(locale, "page.profile.projects.form.actions.cancel")}
          submitLabel={t(locale, "page.profile.projects.form.actions.save")}
          onCancel={onCancel}
        />
      </form>
    </FormProvider>
  );
}
