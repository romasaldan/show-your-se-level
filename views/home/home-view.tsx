import Link from "next/link";
import styles from "./home-view.module.css";
import { HomeMetaTags } from "./home-meta-tags/home-meta-tags";

export function HomeView() {
  return (
    <>
      <HomeMetaTags />
      <div className={styles.root}>
        <section className={styles.hero} aria-labelledby="home-hero-heading">
          <h1 id="home-hero-heading" className={styles.title}>
            A daily diary for what you ship and the skills you grow
          </h1>
          <p className={styles.lead}>
            Record achievements from your workday—features shipped, bugs fixed,
            lessons learned—and tie each entry to the skills you want employers
            and collaborators to see. Over time you build a clear picture of how
            you practice software engineering, not just what is on your resume.
          </p>
        </section>

        <section
          className={styles.section}
          aria-labelledby="home-features-heading"
        >
          <h2 id="home-features-heading" className={styles.sectionTitle}>
            Built for developers who want their progress to be visible
          </h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <h3 className={styles.itemTitle}>Daily achievements</h3>
              <p className={styles.itemBody}>
                Capture what happened today in short, concrete entries so your
                history stays accurate and easy to revisit.
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.itemTitle}>Skills that match your story</h3>
              <p className={styles.itemBody}>
                Link each achievement to skills you strengthened—frameworks,
                practices, or soft skills—so your profile reflects real evidence.
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.itemTitle}>Profile, timeline, and focus</h3>
              <p className={styles.itemBody}>
                Browse a chronological log, skim a project-oriented summary, and
                filter by skill to prepare for interviews, reviews, or your own
                reflection.
              </p>
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="home-cta-heading">
          <h2 id="home-cta-heading" className={styles.sectionTitle}>
            Start your log
          </h2>
          <p className={styles.lead}>
            Sign in to add entries and open your profile. The app is designed to
            work well on phones and desktops so you can jot things down whenever
            you wrap up the day.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/auth" className={styles.cta}>
              Sign in
            </Link>
            <Link href="/profile" className={styles.cta}>
              Go to profile
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
