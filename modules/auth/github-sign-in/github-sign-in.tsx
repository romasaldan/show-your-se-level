"use client";

import { Button } from "@/shared/components/button/button";
import { useAuth } from "@/shared/hooks/use-auth";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import styles from "./github-sign-in.module.css";

function GitHubMark() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 98 96"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.195-22.229-5.42-22.229-24.054 0-5.311 1.99-9.71 5.2-13.137-.485-1.195-2.252-6.275.529-13.069 0 0 4.286-1.359 14.074 5.239 4.714-1.139 9.784-1.172 14.77-.062 4.82-5.32 14.074-5.239 14.074-5.239 2.781 6.794.971 11.874.486 13.069 3.248 3.427 5.197 7.826 5.197 13.137 0 18.686-11.404 22.859-22.324 24.054 1.775 1.537 3.326 4.504 3.326 9.126 0 6.6-.057 11.896-.057 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  );
}

export function GitHubSignIn({ locale }: { locale: AppLocale }) {
  const { login, isLoading } = useAuth();
  const hint = t(locale, "auth.github.hint");
  const continueLabel = t(locale, "auth.github.continue");
  const connectingLabel = t(locale, "auth.github.connecting");
  const ariaConnecting = t(locale, "auth.github.ariaConnecting");
  const ariaContinue = t(locale, "auth.github.ariaContinue");

  return (
    <div className={styles.card}>
      <p className={styles.hint}>
        {hint}
      </p>
      <Button
        type="button"
        variant="default"
        className={styles.githubButton}
        onClick={() => login()}
        disabled={isLoading}
        aria-busy={isLoading}
        aria-label={isLoading ? ariaConnecting : ariaContinue}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner} aria-hidden />
            {connectingLabel}
          </>
        ) : (
          <>
            <GitHubMark />
            {continueLabel}
          </>
        )}
      </Button>
    </div>
  );
}
