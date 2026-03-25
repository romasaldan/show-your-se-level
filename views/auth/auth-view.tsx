import { GitHubSignIn } from "@/modules/auth/github-sign-in/github-sign-in";
import styles from "./auth-view.module.css";

import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

export function AuthView({ locale }: { locale: AppLocale }) {
  const title = t(locale, "page.auth.title");
  const lead = t(locale, "page.auth.lead");

  return (
    <section className={styles.section} aria-labelledby="auth-heading">
      <div className={styles.intro}>
        <h1 id="auth-heading" className={styles.title}>
          {title}
        </h1>
        <p className={styles.lead}>
          {lead}
        </p>
      </div>
      <GitHubSignIn locale={locale} />
    </section>
  );
}
