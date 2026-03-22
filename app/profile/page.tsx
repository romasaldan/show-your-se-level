import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  const label =
    session.user.name ?? session.user.email ?? "Signed-in user";

  return (
    <main>
      <h1>Profile</h1>
      <p>Signed in as {label}</p>
    </main>
  );
}
