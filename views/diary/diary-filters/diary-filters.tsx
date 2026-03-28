"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { Combobox } from "@/shared/components/combobox/combobox";
import { FormActions } from "@/shared/components/form-actions/form-actions";
import { FormField } from "@/shared/components/form-field/form-field";
import { Select } from "@/shared/components/select/select";
import { Input } from "@/shared/components/ui/input";
import { mergeUnique } from "@/shared/utils/merge-unique";
import { sortStrings } from "@/shared/utils/sort-strings";
import type { DiaryEntriesFilter, ProjectOption } from "../diary-entry.types";
import { useDiaryFiltersActions } from "../hooks/use-diary-filters-actions";
import styles from "./diary-filters.module.css";

const ALL_PROJECTS_VALUE = "__all_projects__";

export type DiaryFiltersFormValues = DiaryEntriesFilter;

type DiaryFiltersProps = {
  locale: AppLocale;
  projects: ProjectOption[];
  skills: string[];
  onChangeFilters: (filters: DiaryEntriesFilter) => Promise<void>;
};

export function DiaryFilters({
  locale,
  projects,
  skills,
  onChangeFilters,
}: DiaryFiltersProps) {
  const filtersHeading = t(locale, "page.diary.filters.heading");
  const projectFilterLabel = t(locale, "page.diary.filters.project");
  const skillsFilterLabel = t(locale, "page.diary.filters.skills");
  const fromDateFilterLabel = t(locale, "page.diary.filters.fromDate");
  const toDateFilterLabel = t(locale, "page.diary.filters.toDate");
  const allProjectsLabel = t(locale, "page.diary.filters.allProjects");
  const applyFiltersLabel = t(locale, "page.diary.filters.apply");
  const clearFiltersLabel = t(locale, "page.diary.filters.clear");
  const loadErrorLabel = t(locale, "page.diary.toast.loadFailed");

  const methods = useFormContext<DiaryFiltersFormValues>();
  const { isApplyingFilters, onApplyFilters, onClearFilters } =
    useDiaryFiltersActions({
      methods,
      onChangeFilters,
      loadErrorLabel,
    });

  const selectedSkills = useWatch({
    control: methods.control,
    name: "skills",
    defaultValue: methods.getValues("skills"),
  });
  const fromDate = useWatch({
    control: methods.control,
    name: "fromDate",
    defaultValue: methods.getValues("fromDate"),
  });
  const toDate = useWatch({
    control: methods.control,
    name: "toDate",
    defaultValue: methods.getValues("toDate"),
  });

  const projectFilterOptions = [
    { value: ALL_PROJECTS_VALUE, label: allProjectsLabel },
    ...projects.map((project) => ({
      value: project.id,
      label: project.name,
    })),
  ];

  const normalizedSelectedSkills = (selectedSkills ?? [])
    .map((skillName) => skillName.trim())
    .filter(Boolean);
  const mergedSkillOptions = mergeUnique(skills, normalizedSelectedSkills);
  const skillFilterOptions = sortStrings(mergedSkillOptions)
    .map((skillName) => ({ value: skillName, label: skillName }));

  return (
    <section className={styles.root} aria-labelledby="diary-filters-title">
      <h2 id="diary-filters-title" className={styles.title}>
        {filtersHeading}
      </h2>

      <form className={styles.form} onSubmit={methods.handleSubmit(onApplyFilters)}>
        <div className={styles.grid}>
          <FormField label={projectFilterLabel}>
            <Controller
              control={methods.control}
              name="projectId"
              render={({ field }) => (
                <Select
                  label={projectFilterLabel}
                  options={projectFilterOptions}
                  value={field.value ?? ALL_PROJECTS_VALUE}
                  onChange={(value) =>
                    field.onChange(value === ALL_PROJECTS_VALUE ? null : value)
                  }
                />
              )}
            />
          </FormField>

          <FormField label={skillsFilterLabel}>
            <Controller
              control={methods.control}
              name="skills"
              render={({ field }) => (
                <Combobox
                  label={skillsFilterLabel}
                  options={skillFilterOptions}
                  values={field.value}
                  onChange={field.onChange}
                  placeholder={skillsFilterLabel}
                />
              )}
            />
          </FormField>

          <FormField
            label={fromDateFilterLabel}
            htmlFor="diary-from-date-filter"
          >
            <Controller
              control={methods.control}
              name="fromDate"
              render={({ field }) => (
                <Input
                  id="diary-from-date-filter"
                  type="date"
                  value={field.value}
                  onChange={field.onChange}
                  max={toDate || undefined}
                />
              )}
            />
          </FormField>

          <FormField
            label={toDateFilterLabel}
            htmlFor="diary-to-date-filter"
          >
            <Controller
              control={methods.control}
              name="toDate"
              render={({ field }) => (
                <Input
                  id="diary-to-date-filter"
                  type="date"
                  value={field.value}
                  onChange={field.onChange}
                  min={fromDate || undefined}
                />
              )}
            />
          </FormField>
        </div>

        <FormActions
          cancelLabel={clearFiltersLabel}
          submitLabel={applyFiltersLabel}
          onCancel={onClearFilters}
          cancelDisabled={isApplyingFilters}
          submitDisabled={isApplyingFilters}
        />
      </form>
    </section>
  );
}
