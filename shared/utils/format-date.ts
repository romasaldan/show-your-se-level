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

export function formatMillisDate(
  value: number,
  locale: AppLocale,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  return new Date(value).toLocaleDateString(LOCALE_TO_DATE_LOCALE[locale], options);
}

export function timestampToIsoDate(value: number | null): string | null {
  if (value == null || !Number.isFinite(value)) {
    return null;
  }
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isoDateToTimestamp(value: string | null | undefined): number | null {
  if (!value) {
    return null;
  }
  const ms = new Date(`${value}T00:00:00`).getTime();
  return Number.isFinite(ms) ? ms : null;
}
