import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { AppHeader } from "@/modules/app-header/app-header";
import { Toaster } from "@/shared/components/ui/sonner";
import { PageWrapper } from "@/shared/components/page-wrapper/page-wrapper";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={pageProps.session}>
        <div
          className={`${geistSans.variable} ${geistMono.variable}`}
          style={{ minHeight: "100vh", background: "var(--background)" }}
        >
          <AppHeader />
          <PageWrapper>
            <Component {...pageProps} />
          </PageWrapper>
          <Toaster position="top-right" richColors />
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}
