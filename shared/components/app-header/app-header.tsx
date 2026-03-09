import Link from "next/link";
import { Button } from "../button/button";
import styles from "./app-header.module.css";
import { AppHeaderAuthLinks } from "./auth-links/auth-links";
import { ThemeToggle } from "../theme-toggle/theme-toggle";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <span className={styles.brand}>Show Your SE Level</span>
        <div className={styles.links}>
          <Button variant="ghost" className={styles.navLinkButton}>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" className={styles.navLinkButton}>
            <Link href="/quiz">Quiz</Link>
          </Button>
          <AppHeaderAuthLinks />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
