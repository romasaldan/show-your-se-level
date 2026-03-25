"use client";

import { Button } from "../../../shared/components/button/button";
import { NavLinkButton } from "../../../shared/components/nav-link-button/nav-link-button";
import navLinkStyles from "../../../shared/components/nav-link-button/nav-link-button.module.css";
import { useAuth } from "../../../shared/hooks/use-auth";
import { t } from "@/i18n/t";
import { useAppLocale } from "@/shared/hooks/use-app-locale";

export function AppHeaderAuthLinks() {
  const { isAuthenticated, logout } = useAuth();
  const locale = useAppLocale();

  const authLabel = t(locale, "nav.auth");
  const logoutLabel = t(locale, "nav.logout");

  if (!isAuthenticated) {
    return <NavLinkButton href="/auth">{authLabel}</NavLinkButton>;
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className={navLinkStyles.navLinkButton}
        onClick={() => logout()}
      >
        {logoutLabel}
      </Button>
    </>
  );
}
