import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

type ButtonVariant = "default" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "ghost" ? styles.ghost : styles.default;

  return (
    <button
      className={`${styles.button} ${variantClass} ${className ?? ""}`}
      {...props}
    />
  );
}

