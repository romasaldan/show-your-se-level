import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
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
  secret: process.env["AUTH_SECRET"] ?? process.env["NEXTAUTH_SECRET"],
};
