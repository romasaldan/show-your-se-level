import Head from "next/head";

export function HomeMetaTags() {
  return (
    <Head>
      <title>BRAG Diary — Daily developer achievement and skills log</title>
      <meta
        name="description"
        content="Record daily software engineering achievements, link them to skills you improved, and browse your timeline and profile on mobile or desktop. Built for developers who want a living record of how they grow."
      />
      <meta
        property="og:title"
        content="BRAG Diary — Daily developer achievement and skills log"
      />
      <meta
        property="og:description"
        content="Record daily achievements and skills growth. Timeline, profile, and filters designed for developers."
      />
      <meta property="og:type" content="website" />
    </Head>
  );
}
