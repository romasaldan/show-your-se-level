import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

interface GitHubProfile {
  id: number;
  login: string;
  avatar_url: string | null;
  html_url: string;
  name?: string | null;
  email?: string | null;
  bio?: string | null;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth",
  },
  providers: [
    GitHubProvider({
      clientId:
        process.env["AUTH_GITHUB_ID"] ??
        process.env["GITHUB_ID"] ??
        "",
      clientSecret:
        process.env["AUTH_GITHUB_SECRET"] ??
        process.env["GITHUB_SECRET"] ??
        "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "github" || !profile) {
        return true;
      }

      const githubProfile = profile as GitHubProfile;

      await prisma.user.upsert({
        where: {
          githubId: githubProfile.id,
        },
        update: {
          githubLogin: githubProfile.login,
          name: githubProfile.name ?? null,
          email: githubProfile.email ?? null,
          image: githubProfile.avatar_url ?? null,
          githubUrl: githubProfile.html_url,
          bio: githubProfile.bio ?? null,
          lastLoginAt: new Date(),
        },
        create: {
          githubId: githubProfile.id,
          githubLogin: githubProfile.login,
          name: githubProfile.name ?? null,
          email: githubProfile.email ?? null,
          image: githubProfile.avatar_url ?? null,
          githubUrl: githubProfile.html_url,
          bio: githubProfile.bio ?? null,
          lastLoginAt: new Date(),
        },
      });

      return true;
    },
  },
  secret: process.env["AUTH_SECRET"] ?? process.env["NEXTAUTH_SECRET"],
};
