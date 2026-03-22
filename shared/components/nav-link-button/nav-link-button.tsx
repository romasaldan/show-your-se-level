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
  className?: string;
};

export function NavLinkButton({ href, children, className }: NavLinkButtonProps) {
  const pathname = usePathname();
  const active = isNavActive(pathname, href);

  return (
    <Button
      variant="ghost"
      className={`${styles.navLinkButton}${active ? ` ${styles.navLinkButtonActive}` : ""}${className ? ` ${className}` : ""}`}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
