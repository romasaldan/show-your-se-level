import type React from "react";

import { Button as ShadcnButton } from "@/shared/components/ui/button";

type ButtonVariant = "default" | "ghost";

type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof ShadcnButton>,
  "variant"
> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return <ShadcnButton variant={variant} className={className} {...props} />;
}
