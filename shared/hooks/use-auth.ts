"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { defaultLocale, isAppLocale } from "@/i18n/config";

export function useAuth() {
  const { data: session, status } = useSession();
  const { locale } = useRouter();
  const currentLocale = isAppLocale(locale ?? "") ? locale : defaultLocale;

  const profileCallbackUrl = `/${currentLocale}/profile`;
  const homeCallbackUrl = `/${currentLocale}`;

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    session,
    login: () => signIn("github", { callbackUrl: profileCallbackUrl }),
    logout: () => signOut({ callbackUrl: homeCallbackUrl }),
  };
}
