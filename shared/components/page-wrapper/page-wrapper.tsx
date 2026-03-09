import type { ReactNode } from "react";
import styles from "./page-wrapper.module.css";

type PageWrapperProps = {
  children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return <main className={styles.root}>{children}</main>;
}

