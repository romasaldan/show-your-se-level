"use client";

import { Button } from "../../../shared/components/button/button";
import { NavLinkButton } from "../../../shared/components/nav-link-button/nav-link-button";
import navLinkStyles from "../../../shared/components/nav-link-button/nav-link-button.module.css";
import { useAuth } from "../../../shared/hooks/use-auth";

export function AppHeaderAuthLinks() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <NavLinkButton href="/auth">Auth</NavLinkButton>;
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className={navLinkStyles.navLinkButton}
        onClick={() => logout()}
      >
        Log out
      </Button>
    </>
  );
}
