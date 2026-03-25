import Link from "next/link";
import styles from "./home-view.module.css";
import { HomeMetaTags } from "./home-meta-tags/home-meta-tags";

import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

export function HomeView({ locale }: { locale: AppLocale }) {
  return (
    <>
      <HomeMetaTags locale={locale} />
      <div className={styles.root}>
        <section className={styles.hero} aria-labelledby="home-hero-heading">
          <h1 id="home-hero-heading" className={styles.title}>
            {t(locale, "home.hero.title")}
          </h1>
          <p className={styles.lead}>
            {t(locale, "home.hero.lead")}
          </p>
        </section>

        <section
          className={styles.section}
          aria-labelledby="home-features-heading"
        >
          <h2 id="home-features-heading" className={styles.sectionTitle}>
            {t(locale, "home.features.title")}
          </h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <h3 className={styles.itemTitle}>
                {t(locale, "home.features.daily.title")}
              </h3>
              <p className={styles.itemBody}>
                {t(locale, "home.features.daily.body")}
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.itemTitle}>
                {t(locale, "home.features.skills.title")}
              </h3>
              <p className={styles.itemBody}>
                {t(locale, "home.features.skills.body")}
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.itemTitle}>
                {t(locale, "home.features.profile.title")}
              </h3>
              <p className={styles.itemBody}>
                {t(locale, "home.features.profile.body")}
              </p>
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="home-cta-heading">
          <h2 id="home-cta-heading" className={styles.sectionTitle}>
            {t(locale, "home.cta.title")}
          </h2>
          <p className={styles.lead}>
            {t(locale, "home.cta.lead")}
          </p>
          <div className={styles.ctaRow}>
            <Link href="/auth" className={styles.cta}>
              {t(locale, "home.cta.signIn")}
            </Link>
            <Link href="/profile" className={styles.cta}>
              {t(locale, "home.cta.goToProfile")}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
