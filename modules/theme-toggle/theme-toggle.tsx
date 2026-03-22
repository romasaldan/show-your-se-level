"use client";

import { useTheme } from "next-themes";
import { useMounted } from "../../shared/hooks/use-mounted";
import { MaskIcon } from "./mask-icon";
import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <div
        className={`${styles.shell} ${styles.placeholder}`}
        aria-hidden="true"
      >
        <span className={styles.icon} />
      </div>
    );
  }

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const iconUrl =
    resolvedTheme === "dark" ? "/icons/sun.svg" : "/icons/moon.svg";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className={`${styles.shell} ${styles.button}`}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      <MaskIcon iconUrl={iconUrl} className={styles.icon} />
    </button>
  );
}
