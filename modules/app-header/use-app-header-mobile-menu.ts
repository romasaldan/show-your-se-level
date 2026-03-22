"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useAppHeaderMobileMenu() {
  const pathname = usePathname();
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
