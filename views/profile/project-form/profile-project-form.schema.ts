import { z } from "zod";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

export function createProfileProjectFormSchema(locale: AppLocale) {
  const dateFieldSchema = z
    .union([z.string().trim(), z.null(), z.undefined()])
    .transform((value) => {
      if (value == null || value.length === 0) {
        return null;
      }
      return value;
    })
    .refine((value) => value == null || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: t(locale, "page.profile.projects.form.errors.dateInvalid"),
    });

  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t(locale, "page.profile.projects.form.errors.nameRequired")),
    kind: z.enum(["company", "personal"]),
    startDate: dateFieldSchema,
    endDate: dateFieldSchema,
    selectedSkills: z.array(z.string()),
  }).refine(
    (data) => data.startDate == null || data.endDate == null || data.endDate >= data.startDate,
    {
      message: t(locale, "page.profile.projects.form.errors.endDateBeforeStart"),
      path: ["endDate"],
    },
  );
}
