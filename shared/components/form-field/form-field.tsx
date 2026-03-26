import type { ReactNode } from "react";
import styles from "./form-field.module.css";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className={styles.root}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}

