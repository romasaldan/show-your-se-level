import { z } from "zod";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

export function createProfileProjectFormSchema(locale: AppLocale) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t(locale, "page.profile.projects.form.errors.nameRequired")),
    kind: z.enum(["company", "personal"]),
    selectedSkills: z.array(z.string()),
  });
}
