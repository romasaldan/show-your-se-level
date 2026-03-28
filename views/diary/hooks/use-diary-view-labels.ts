"use client";

import { useMemo } from "react";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

type UseDiaryViewLabelsParams = {
  locale: AppLocale;
  label: string;
};

export function useDiaryViewLabels({ locale, label }: UseDiaryViewLabelsParams) {
  return useMemo(
    () => ({
      title: t(locale, "page.diary.title"),
      subtitle: t(locale, "page.diary.subtitle", { label }),
      addEntryLabel: t(locale, "page.diary.addEntry"),
      entriesHeading: t(locale, "page.diary.entriesHeading"),
      filtersHeading: t(locale, "page.diary.filters.heading"),
      projectFilterLabel: t(locale, "page.diary.filters.project"),
      skillsFilterLabel: t(locale, "page.diary.filters.skills"),
      fromDateFilterLabel: t(locale, "page.diary.filters.fromDate"),
      toDateFilterLabel: t(locale, "page.diary.filters.toDate"),
      allProjectsLabel: t(locale, "page.diary.filters.allProjects"),
      applyFiltersLabel: t(locale, "page.diary.filters.apply"),
      clearFiltersLabel: t(locale, "page.diary.filters.clear"),
      noEntriesLabel: t(locale, "page.diary.filters.empty"),
      loadErrorLabel: t(locale, "page.diary.toast.loadFailed"),
      saveErrorLabel: t(locale, "page.diary.toast.saveFailed"),
      deleteErrorLabel: t(locale, "page.diary.toast.deleteFailed"),
      deleteConfirmLabel: t(locale, "page.diary.confirm.delete"),
    }),
    [label, locale],
  );
}
