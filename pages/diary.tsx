import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { DiaryView } from "@/views/diary/diary-view";
import { defaultLocale, isAppLocale, type AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import {
  listEntriesByUserId,
  listProjectsByUserId,
  listSkills,
} from "@/lib/diary-repository";

type DiaryPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function DiaryPage({
  label,
  locale,
  initialEntries,
  projects,
  skills,
}: DiaryPageProps) {
  return (
    <DiaryView
      label={label}
      locale={locale as AppLocale}
      initialEntries={initialEntries}
      projects={projects}
      skills={skills}
    />
  );
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

  if (!session?.user?.id) {
    return {
      redirect: {
        destination: `/${locale}/auth`,
        permanent: false,
      },
    };
  }

  const userId = session.user.id;

  const [initialEntries, projects, skills] = await Promise.all([
    listEntriesByUserId(userId),
    listProjectsByUserId(userId),
    listSkills(),
  ]);

  return {
    props: {
      label:
        session.user.name ??
        session.user.email ??
        t(locale, "common.signedInUser"),
      locale,
      initialEntries,
      projects,
      skills,
    },
  };
}
