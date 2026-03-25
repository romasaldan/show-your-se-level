import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { DiaryView } from "@/views/diary/diary-view";

type DiaryPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function DiaryPage({ label }: DiaryPageProps) {
  return <DiaryView label={label} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session?.user) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      label: session.user.name ?? session.user.email ?? "Signed-in user",
    },
  };
}

