import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "../modules/app-header/app-header";
import { PageWrapper } from "../shared/components/page-wrapper/page-wrapper";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Show Your SE Level",
  description: "Skeleton application for assessing software engineering level",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ minHeight: "100vh", background: "var(--background)" }}
      >
        <Providers>
          <AppHeader />
          <PageWrapper>{children}</PageWrapper>
        </Providers>
      </body>
    </html>
  );
}
