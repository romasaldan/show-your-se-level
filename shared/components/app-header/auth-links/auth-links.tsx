"use client";

import Link from "next/link";
import { Button } from "../../button/button";
import styles from "../app-header.module.css";
import { useAuth } from "../../../hooks/use-auth";

export function AppHeaderAuthLinks() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Button variant="ghost" className={styles.navLinkButton}>
        <Link href="/auth">Auth</Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" className={styles.navLinkButton}>
      <Link href="/profile">Profile</Link>
    </Button>
  );
}
