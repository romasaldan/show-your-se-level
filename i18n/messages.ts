import type { AppLocale } from "./config";

type Messages = Record<string, string>;

export const MESSAGES: Record<AppLocale, Messages> = {
  en: {
    "nav.brand": "BRAG Diary",
    "nav.diary": "Diary",
    "nav.profile": "Profile",
    "nav.auth": "Auth",
    "nav.logout": "Log out",

    "common.signedInUser": "Signed-in user",

    "page.quiz.title": "Quiz",
    "page.quiz.description": "This is the quiz page skeleton.",

    "page.profile.title": "Profile",
    "page.profile.signedInAs": "Signed in as {label}",

    "page.diary.title": "Diary",
    "page.diary.subtitle":
      "Signed in as {label}. Capture what you shipped and the skills you strengthened today.",

    "page.auth.title": "Sign in",
    "page.auth.lead":
      "Use your GitHub account to access your profile and keep your progress tied to one identity.",

    "auth.github.hint":
      "You’ll leave this site briefly to authorize with GitHub, then return to your profile.",
    "auth.github.continue": "Continue with GitHub",
    "auth.github.connecting": "Connecting…",
    "auth.github.ariaConnecting": "Connecting to GitHub",
    "auth.github.ariaContinue": "Continue with GitHub",

    "home.hero.title": "A daily diary for what you ship and the skills you grow",
    "home.hero.lead":
      "Record achievements from your workday—features shipped, bugs fixed, lessons learned—and tie each entry to the skills you want employers and collaborators to see. Over time you build a clear picture of how you practice software engineering, not just what is on your resume.",

    "home.features.title":
      "Built for developers who want their progress to be visible",
    "home.features.daily.title": "Daily achievements",
    "home.features.daily.body":
      "Capture what happened today in short, concrete entries so your history stays accurate and easy to revisit.",
    "home.features.skills.title": "Skills that match your story",
    "home.features.skills.body":
      "Link each achievement to skills you strengthened—frameworks, practices, or soft skills—so your profile reflects real evidence.",
    "home.features.profile.title": "Profile, timeline, and focus",
    "home.features.profile.body":
      "Browse a chronological log, skim a project-oriented summary, and filter by skill to prepare for interviews, reviews, or your own reflection.",

    "home.cta.title": "Start your log",
    "home.cta.lead":
      "Sign in to add entries and open your profile. The app is designed to work well on phones and desktops so you can jot things down whenever you wrap up the day.",
    "home.cta.signIn": "Sign in",
    "home.cta.goToProfile": "Go to profile",

    "home.meta.title": "BRAG Diary — Daily developer achievement and skills log",
    "home.meta.description":
      "Record daily software engineering achievements, link them to skills you improved, and browse your timeline and profile on mobile or desktop. Built for developers who want a living record of how they grow.",
    "home.meta.ogTitle":
      "BRAG Diary — Daily developer achievement and skills log",
    "home.meta.ogDescription":
      "Record daily achievements and skills growth. Timeline, profile, and filters designed for developers.",
  },
  uk: {
    "nav.brand": "Щоденник BRAG",
    "nav.diary": "Щоденник",
    "nav.profile": "Профіль",
    "nav.auth": "Увійти",
    "nav.logout": "Вийти",

    "common.signedInUser": "Користувач із сесією",

    "page.quiz.title": "Вікторина",
    "page.quiz.description": "Це заготовка сторінки вікторини.",

    "page.profile.title": "Профіль",
    "page.profile.signedInAs": "Увійшли як {label}",

    "page.diary.title": "Щоденник",
    "page.diary.subtitle":
      "Увійшли як {label}. Запишіть, що ви здали сьогодні, і які навички зміцнили.",

    "page.auth.title": "Увійти",
    "page.auth.lead":
      "Використовуйте обліковий запис GitHub, щоб отримати доступ до профілю та зберігати прогрес, прив'язаний до однієї ідентичності.",

    "auth.github.hint":
      "Ви ненадовго покинете цей сайт, щоб авторизуватися через GitHub, а потім повернетеся до свого профілю.",
    "auth.github.continue": "Продовжити з GitHub",
    "auth.github.connecting": "Підключення…",
    "auth.github.ariaConnecting": "Підключення до GitHub",
    "auth.github.ariaContinue": "Продовжити з GitHub",

    "home.hero.title": "Щоденник на щодень: що ви випустили і як зростали в навичках",
    "home.hero.lead":
      "Записуйте досягнення з вашого робочого дня — релізи, виправлені баги, уроки — і пов'язуйте кожен запис із навичками, які ви хочете показати роботодавцям та колегам. З часом ви формуєте чітку картину того, як ви практикуєте розробку ПЗ, а не лише те, що є у вашому резюме.",

    "home.features.title":
      "Створено для розробників, які хочуть бачити свій прогрес",
    "home.features.daily.title": "Щоденні досягнення",
    "home.features.daily.body":
      "Коротко й конкретно зафіксуйте, що сталося сьогодні, щоб історія лишалася точною та легко переглядалася.",
    "home.features.skills.title": "Навички, що відповідають вашій історії",
    "home.features.skills.body":
      "Пов'язуйте кожне досягнення з навичками, які ви зміцнили — фреймворки, практики чи soft skills — щоб ваш профіль відображав реальні докази.",
    "home.features.profile.title": "Профіль, таймлайн і фокус",
    "home.features.profile.body":
      "Переглядайте хронологічний журнал, перегортайте підсумок, зорієнтований на проєкти, та фільтруйте за навичкою, щоб підготуватися до співбесід, оглядів або власних рефлексій.",

    "home.cta.title": "Почніть свій журнал",
    "home.cta.lead":
      "Увійдіть, щоб додавати записи та відкривати свій профіль. Додаток добре працює і на телефонах, і на комп'ютерах, тож ви можете занотовувати думки в будь-який момент, коли завершуєте день.",
    "home.cta.signIn": "Увійти",
    "home.cta.goToProfile": "Перейти до профілю",

    "home.meta.title": "Щоденник BRAG — журнал досягнень розробника та навичок",
    "home.meta.description":
      "Записуйте щоденні досягнення з інженерії ПЗ, пов'язуйте їх із навичками, які ви покращили, і переглядайте таймлайн та профіль на мобільному або десктопі. Створено для розробників, які хочуть живий запис власного росту.",
    "home.meta.ogTitle":
      "Щоденник BRAG — журнал досягнень розробника та навичок",
    "home.meta.ogDescription":
      "Записуйте щоденні досягнення та ріст навичок. Таймлайн, профіль і фільтри, створені для розробників.",
  },
};

