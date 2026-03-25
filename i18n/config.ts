export const defaultLocale = "en";

export type AppLocale = "en" | "uk";

export function isAppLocale(value: string): value is AppLocale {
  return value === "en" || value === "uk";
}

