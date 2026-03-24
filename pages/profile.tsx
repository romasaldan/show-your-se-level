import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

type ProfilePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProfilePage({ label }: ProfilePageProps) {
  return (
    <main>
      <h1>Profile</h1>
      <p>Signed in as {label}</p>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
