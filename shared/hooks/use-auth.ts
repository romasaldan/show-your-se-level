"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    session,
    login: () => signIn("github", { callbackUrl: "/profile" }),
    logout: () => signOut({ callbackUrl: "/" }),
  };
}
