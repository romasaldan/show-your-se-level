"use client";

import { useTheme } from "next-themes";
import { MaskIcon } from "./mask-icon";
import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className={styles.button}
      suppressHydrationWarning
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {resolvedTheme === "dark" ? (
        <MaskIcon iconUrl="/icons/sun.svg" className={styles.icon} />
      ) : (
        <MaskIcon iconUrl="/icons/moon.svg" className={styles.icon} />
      )}
    </button>
  );
}

