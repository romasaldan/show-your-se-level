"use client";

import styles from "./hamburger-menu-toggle.module.css";

type HamburgerMenuToggleProps = {
  expanded: boolean;
  onToggle: () => void;
  controlsId: string;
  className?: string;
};

export function HamburgerMenuToggle({
  expanded,
  onToggle,
  controlsId,
  className,
}: HamburgerMenuToggleProps) {
  return (
    <button
      type="button"
      className={`${styles.toggle}${className ? ` ${className}` : ""}`}
      aria-expanded={expanded}
      aria-controls={controlsId}
      onClick={onToggle}
    >
      <span className={styles.visuallyHidden}>
        {expanded ? "Close menu" : "Open menu"}
      </span>
      <span className={styles.hamburger} aria-hidden>
        <span className={expanded ? styles.lineOpen1 : styles.line} />
        <span className={expanded ? styles.middleOpen : styles.line} />
        <span className={expanded ? styles.lineOpen3 : styles.line} />
      </span>
    </button>
  );
}
