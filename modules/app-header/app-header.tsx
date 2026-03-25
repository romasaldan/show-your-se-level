"use client";

import { useId } from "react";
import Link from "next/link";
import styles from "./app-header.module.css";
import { AppHeaderAuthLinks } from "./auth-links/auth-links";
import { HamburgerMenuToggle } from "../../shared/components/hamburger-menu-toggle/hamburger-menu-toggle";
import { NavLinkButton } from "../../shared/components/nav-link-button/nav-link-button";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { useAppHeaderMobileMenu } from "./use-app-header-mobile-menu";

export function AppHeader() {
  const menuId = useId();
  const { menuOpen, setMenuOpen } = useAppHeaderMobileMenu();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <div className={styles.topRow}>
          <Link href="/" className={styles.brand}>
            BRAG Diary
          </Link>
          <HamburgerMenuToggle
            expanded={menuOpen}
            onToggle={() => setMenuOpen((open) => !open)}
            controlsId={menuId}
          />
        </div>
        <div
          id={menuId}
          className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}
        >
          <NavLinkButton href="/diary" className={styles.mobileNavItem}>
            Diary
          </NavLinkButton>
          <NavLinkButton href="/profile" className={styles.mobileNavItem}>
            Profile
          </NavLinkButton>
          <div className={styles.mobileAuthRow}>
            <AppHeaderAuthLinks />
          </div>
          <div className={styles.themeRow}>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
