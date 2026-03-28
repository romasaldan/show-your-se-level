"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { UseFormReturn } from "react-hook-form";
import { executeAction } from "@/shared/api/utils";
import type { DiaryEntriesFilter } from "../diary-entry.types";
import type { DiaryFiltersFormValues } from "../diary-filters/diary-filters";

type UseDiaryFiltersActionsParams = {
  methods: UseFormReturn<DiaryFiltersFormValues>;
  onChangeFilters: (filters: DiaryEntriesFilter) => Promise<void>;
  loadErrorLabel: string;
};

function normalizeFilters(values: DiaryFiltersFormValues): DiaryEntriesFilter {
  return {
    projectId: values.projectId,
    skills: [...new Set(values.skills.map((value) => value.trim()).filter(Boolean))],
    fromDate: values.fromDate,
    toDate: values.toDate,
  };
}

export function useDiaryFiltersActions({
  methods,
  onChangeFilters,
  loadErrorLabel,
}: UseDiaryFiltersActionsParams) {
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);

  const runFiltersAction = async (run: () => Promise<void>) => {
    setIsApplyingFilters(true);
    await executeAction({
      run,
      onResolved: () => undefined,
      onError: (message) => toast.error(message || loadErrorLabel),
      onSettled: () => setIsApplyingFilters(false),
      fallbackErrorMessage: loadErrorLabel,
    });
  };

  const onApplyFilters = async (values: DiaryFiltersFormValues) => {
    await runFiltersAction(() => onChangeFilters(normalizeFilters(values)));
  };

  const onClearFilters = async () => {
    const values: DiaryFiltersFormValues = {
      projectId: null,
      skills: [],
      fromDate: "",
      toDate: "",
    };
    methods.reset(values);
    await runFiltersAction(() => onChangeFilters(values));
  };

  return {
    isApplyingFilters,
    onApplyFilters,
    onClearFilters,
  };
}
