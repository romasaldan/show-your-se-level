import type { AppLocale } from "./config";
import { defaultLocale } from "./config";
import { MESSAGES } from "./messages";

export function t(
  locale: AppLocale,
  key: string,
  vars?: Record<string, string | number>,
) {
  const messagesForLocale = MESSAGES[locale] ?? MESSAGES[defaultLocale];
  let template = messagesForLocale[key];

  // Fallback to default locale, then to the key (so missing translations are obvious).
  if (!template) {
    template = MESSAGES[defaultLocale]?.[key] ?? key;
  }

  if (vars) {
    for (const [varName, value] of Object.entries(vars)) {
      template = template.replace(`{${varName}}`, String(value));
    }
  }

  return template;
}

