import type { HTMLAttributes } from "react";
import styles from "./card-container.module.css";

type CardContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
};

export function CardContainer({
  as = "article",
  className,
  ...props
}: CardContainerProps) {
  const Component = as;

  return (
    <Component
      className={`${styles.cardContainer} ${className ?? ""}`}
      {...props}
    />
  );
}
