import styles from "./app-header.module.css";
import { AppHeaderAuthLinks } from "./auth-links/auth-links";
import { NavLinkButton } from "../../shared/components/nav-link-button/nav-link-button";
import { ThemeToggle } from "../theme-toggle/theme-toggle";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <span className={styles.brand}>BRAG Diary</span>
        <div className={styles.links}>
          <NavLinkButton href="/">Profile</NavLinkButton>
          <AppHeaderAuthLinks />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
