import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { defaultLocale, isAppLocale, type AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

type ProfilePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProfilePage({ label, locale }: ProfilePageProps) {
  const title = t(locale as AppLocale, "page.profile.title");
  const signedInAs = t(locale as AppLocale, "page.profile.signedInAs", { label });

  return (
    <main>
      <h1>{title}</h1>
      <p>{signedInAs}</p>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale: AppLocale = isAppLocale(context.locale ?? "")
    ? (context.locale as AppLocale)
    : defaultLocale;
  const session = await getServerSession(context.req, context.res, authOptions);

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
      label:
        session.user.name ??
        session.user.email ??
        t(locale, "common.signedInUser"),
      locale,
    },
  };
}
