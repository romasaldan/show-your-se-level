import { HomeView } from "@/views/home/home-view";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { defaultLocale, isAppLocale, type AppLocale } from "@/i18n/config";

type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function HomePage({ locale }: HomePageProps) {
  return <HomeView locale={locale as AppLocale} />;
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
