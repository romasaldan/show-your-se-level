import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { defaultLocale, isAppLocale, type AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";

type QuizPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function QuizPage({ locale }: QuizPageProps) {
  const title = t(locale as AppLocale, "page.quiz.title");
  const description = t(
    locale as AppLocale,
    "page.quiz.description",
  );

  return (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale: AppLocale = isAppLocale(context.locale ?? "")
    ? (context.locale as AppLocale)
    : defaultLocale;

  return {
    props: {
      locale,
    },
  };
}

