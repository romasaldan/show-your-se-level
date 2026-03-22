import type { Metadata } from "next";
import { HomeView } from "@/views/home/home-view";

export const metadata: Metadata = {
  title: "BRAG Diary — Daily developer achievement and skills log",
  description:
    "Record daily software engineering achievements, link them to skills you improved, and browse your timeline and profile on mobile or desktop. Built for developers who want a living record of how they grow.",
  openGraph: {
    title: "BRAG Diary — Daily developer achievement and skills log",
    description:
      "Record daily achievements and skills growth. Timeline, profile, and filters designed for developers.",
    type: "website",
  },
};

export default function Home() {
  return <HomeView />;
}
