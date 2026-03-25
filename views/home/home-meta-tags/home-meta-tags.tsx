import Head from "next/head";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

export function HomeMetaTags({ locale }: { locale: AppLocale }) {
  const title = t(locale, "home.meta.title");
  const description = t(locale, "home.meta.description");
  const ogTitle = t(locale, "home.meta.ogTitle");
  const ogDescription = t(locale, "home.meta.ogDescription");

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <meta
        property="og:title"
        content={ogTitle}
      />
      <meta
        property="og:description"
        content={ogDescription}
      />
      <meta property="og:type" content="website" />
    </Head>
  );
}
