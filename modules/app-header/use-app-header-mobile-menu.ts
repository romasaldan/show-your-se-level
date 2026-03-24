"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function useAppHeaderMobileMenu() {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [storedPathname, setStoredPathname] = useState(pathname);

  if (pathname !== storedPathname) {
    setStoredPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return { menuOpen, setMenuOpen };
}
