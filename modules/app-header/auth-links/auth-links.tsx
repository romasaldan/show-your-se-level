"use client";

import { NavLinkButton } from "../../../shared/components/nav-link-button/nav-link-button";
import { useAuth } from "../../../shared/hooks/use-auth";

export function AppHeaderAuthLinks() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <NavLinkButton href="/auth">Auth</NavLinkButton>;
  }

  return <NavLinkButton href="/profile">Profile</NavLinkButton>;
}
