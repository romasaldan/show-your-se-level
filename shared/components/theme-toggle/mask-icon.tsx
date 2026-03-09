type MaskIconProps = {
  iconUrl: string;
  className?: string;
};

export function MaskIcon({ iconUrl, className }: MaskIconProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        WebkitMaskImage: `url(${iconUrl})`,
        maskImage: `url(${iconUrl})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        backgroundColor: "currentColor",
      }}
      aria-hidden="true"
    />
  );
}

