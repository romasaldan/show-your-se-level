"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button/button";
import { isNavActive } from "../../utils/is-nav-active";
import styles from "./nav-link-button.module.css";

type NavLinkButtonProps = {
  href: string;
  children: ReactNode;
};

export function NavLinkButton({ href, children }: NavLinkButtonProps) {
  const pathname = usePathname();
  const active = isNavActive(pathname, href);

  return (
    <Button
      variant="ghost"
      className={`${styles.navLinkButton}${active ? ` ${styles.navLinkButtonActive}` : ""}`}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
