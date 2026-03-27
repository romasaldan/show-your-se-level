import { z } from "zod";
import { t } from "@/i18n/t";
import type { AppLocale } from "@/i18n/config";

export function createDiaryEntryFormSchema(locale: AppLocale) {
  return z.object({
    projectId: z
      .string()
      .min(1, t(locale, "page.diary.form.errors.projectRequired")),
    date: z.string(),
    title: z
      .string()
      .trim()
      .min(1, t(locale, "page.diary.form.errors.titleRequired")),
    details: z
      .string()
      .trim()
      .min(1, t(locale, "page.diary.form.errors.detailsRequired")),
    selectedSkills: z.array(z.string()),
    importance: z.enum(["low", "medium", "high"]),
  });
}
