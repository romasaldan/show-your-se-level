import styles from "./mask-icon.module.css";

type MaskIconProps = {
  iconUrl: string;
  className?: string;
};

export function MaskIcon({ iconUrl, className }: MaskIconProps) {
  return (
    <span
      className={`${styles.icon} ${className ?? ""}`.trim()}
      style={{
        WebkitMaskImage: `url(${iconUrl})`,
        maskImage: `url(${iconUrl})`,
      }}
      aria-hidden="true"
    />
  );
}

