import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  const isAuthed = !!token;
  if (isAuthed) {
    return NextResponse.next();
  }

  const { pathname, locale } = req.nextUrl;
  const isProfileRoute =
    pathname === "/profile" || pathname.startsWith("/profile/");

  if (!isProfileRoute) {
    return NextResponse.next();
  }

  const signInPath = locale ? `/${locale}/auth` : "/auth";
  const url = new URL(signInPath, req.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/profile/:path*", "/:locale/profile/:path*"],
};
