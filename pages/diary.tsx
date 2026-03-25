import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { DiaryView } from "@/views/diary/diary-view";
import { defaultLocale, isAppLocale, type AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

type DiaryPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function DiaryPage({ label, locale }: DiaryPageProps) {
  return <DiaryView label={label} locale={locale as AppLocale} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale: AppLocale = isAppLocale(context.locale ?? "")
    ? (context.locale as AppLocale)
    : defaultLocale;
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session?.user) {
    return {
      redirect: {
        destination: `/${locale}/auth`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      label: session.user.name ?? session.user.email ?? t(locale, "common.signedInUser"),
      locale,
    },
  };
}

