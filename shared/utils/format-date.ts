import type { AppLocale } from "@/i18n/config";

const LOCALE_TO_DATE_LOCALE: Record<AppLocale, string> = {
  en: "en-US",
  uk: "uk-UA",
};

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function formatIsoDate(
  date: string,
  locale: AppLocale,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  if (!ISO_DATE_PATTERN.test(date)) return date;
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    LOCALE_TO_DATE_LOCALE[locale],
    options,
  );
}
