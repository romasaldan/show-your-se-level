import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { defaultLocale, isAppLocale, type AppLocale } from "@/i18n/config";
import {
  getProfileByUserId,
  listAvailableSkills,
  listEncounteredSkillsForUser,
  listProjectsForProfile,
} from "@/lib/profile-repository";
import { ProfileView } from "@/views/profile/profile-view";

type ProfilePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProfilePage({
  locale,
  identity,
  projects,
  encounteredSkills,
  availableSkills,
}: ProfilePageProps) {
  return (
    <ProfileView
      locale={locale as AppLocale}
      identity={identity}
      initialProjects={projects}
      initialEncounteredSkills={encounteredSkills}
      availableSkills={availableSkills}
    />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale: AppLocale = isAppLocale(context.locale ?? "")
    ? (context.locale as AppLocale)
    : defaultLocale;
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.id) {
    return {
      redirect: {
        destination: `/${locale}/auth`,
        permanent: false,
      },
    };
  }

  const userId = session.user.id;
  const [identity, projects, encounteredSkills, availableSkills] = await Promise.all([
    getProfileByUserId(userId),
    listProjectsForProfile(userId),
    listEncounteredSkillsForUser(userId),
    listAvailableSkills(),
  ]);

  return {
    props: {
      locale,
      identity,
      projects,
      encounteredSkills,
      availableSkills,
    },
  };
}
