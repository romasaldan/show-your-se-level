"use client";

import { useRouter } from "next/router";
import { defaultLocale, isAppLocale, type AppLocale } from "@/i18n/config";

export function useAppLocale(): AppLocale {
  const router = useRouter();
  const localeRaw = router.locale;

  return isAppLocale(localeRaw ?? "")
    ? (localeRaw as AppLocale)
    : (defaultLocale as AppLocale);
}

