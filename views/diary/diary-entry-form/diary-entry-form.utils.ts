import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { formatMillisDate, timestampToIsoDate } from "@/shared/utils/format-date";
import type { ProjectOption } from "../diary-entry.types";

type GetProjectDateWarningParams = {
  locale: AppLocale;
  date: string;
  project: ProjectOption | null;
};

export function getProjectDateWarning({
  locale,
  date,
  project,
}: GetProjectDateWarningParams): string | null {
  if (!project || !date) {
    return null;
  }

  const projectStartDateIso = timestampToIsoDate(project.startDate);
  const projectEndDateIso = timestampToIsoDate(project.endDate);

  if (projectStartDateIso && date < projectStartDateIso) {
    const startDate = project.startDate;
    if (startDate == null) {
      return null;
    }
    return t(locale, "page.diary.form.warnings.beforeProjectStart", {
      startDate: formatMillisDate(startDate, locale),
    });
  }

  // Open-ended project: validate only by start date.
  if (!projectEndDateIso) {
    return null;
  }

  if (date > projectEndDateIso) {
    const endDate = project.endDate;
    if (endDate == null) {
      return null;
    }
    return t(locale, "page.diary.form.warnings.afterProjectEnd", {
      endDate: formatMillisDate(endDate, locale),
    });
  }

  return null;
}
