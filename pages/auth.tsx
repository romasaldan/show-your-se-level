import { AuthView } from "@/views/auth/auth-view";

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { defaultLocale, isAppLocale, type AppLocale } from "@/i18n/config";

type AuthPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function AuthPage({ locale }: AuthPageProps) {
  return <AuthView locale={locale} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale: AppLocale = isAppLocale(context.locale ?? "")
    ? (context.locale as AppLocale)
    : defaultLocale;

  return {
    props: {
      locale,
    },
  };
}
