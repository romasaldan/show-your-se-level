import { isAppLocale } from "@/i18n/config";

function normalizePath(path: string) {
  const segments = path.split("/").filter(Boolean);
  if (segments.length && isAppLocale(segments[0])) {
    segments.shift();
  }
  return `/${segments.join("/")}`;
}

export function isNavActive(pathname: string, href: string) {
  const normalizedPath = normalizePath(pathname);
  const normalizedHref = normalizePath(href);

  if (normalizedHref === "/") {
    return normalizedPath === "/";
  }

  return (
    normalizedPath === normalizedHref ||
    normalizedPath.startsWith(`${normalizedHref}/`)
  );
}
