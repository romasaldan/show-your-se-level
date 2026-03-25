"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { isAppLocale } from "@/i18n/config";
import { AVAILABLE_LOCALES, LocaleLabel } from "@/i18n/constants";
import styles from "./language-toggle.module.css";
import { useAppLocale } from "@/shared/hooks/use-app-locale";

export function LanguageToggle() {
  const router = useRouter();
  const asPath = router.asPath;

  const [pathAndQuery, hash] = asPath.split("#");
  const [pathPart, queryString] = pathAndQuery.split("?");

  const segments = pathPart.split("/").filter(Boolean);
  const firstSegment = segments[0] ?? "";
  const hasLocalePrefix = isAppLocale(firstSegment);
  const currentLocale = useAppLocale();

  const restPath = hasLocalePrefix ? segments.slice(1) : segments;
  const basePath = `/${restPath.length ? restPath.join("/") : ""}`;
  const nextQuery = queryString ? `?${queryString}` : "";
  const nextHash = hash ? `#${hash}` : "";
  const hrefWithoutLocale = `${basePath}${nextQuery}${nextHash}`;

  return (
    <nav aria-label="Language switcher" className={styles.nav}>
      {AVAILABLE_LOCALES.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={hrefWithoutLocale}
            locale={locale}
            aria-current={isActive ? "page" : undefined}
            className={`${styles.base} ${
              isActive ? styles.active : styles.switch
            }`}
          >
            {LocaleLabel[locale]}
          </Link>
        );
      })}
    </nav>
  );
}

