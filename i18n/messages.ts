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
    "shared.skillsCombobox.createOption": `Add "{value}"`,

    "page.quiz.title": "Quiz",
    "page.quiz.description": "This is the quiz page skeleton.",

    "page.profile.title": "Profile",
    "page.profile.signedInAs": "Signed in as {label}",
    "page.profile.github.heading": "GitHub profile",
    "page.profile.github.avatarAlt": "Avatar of {login}",
    "page.profile.github.openLink": "Open GitHub profile",

    "page.profile.projects.heading": "Projects",
    "page.profile.projects.createButton": "Create project",
    "page.profile.projects.empty": "No projects yet.",
    "page.profile.projects.confirm.delete": "Delete this project?",
    "page.profile.projects.toast.saveFailed": "Failed to save project",
    "page.profile.projects.toast.deleteFailed": "Failed to delete project",
    "page.profile.projects.kind.label": "Kind",
    "page.profile.projects.kind.general": "General",
    "page.profile.projects.kind.company": "Company",
    "page.profile.projects.kind.personal": "Personal",
    "page.profile.projects.startDate.label": "Start date",
    "page.profile.projects.endDate.label": "End date",
    "page.profile.projects.notSet": "Not set",
    "page.profile.projects.skills.label": "Skills",
    "page.profile.projects.skills.empty": "No skills assigned",
    "page.profile.projects.actions.edit": "Edit",
    "page.profile.projects.actions.delete": "Delete",
    "page.profile.projects.generalLock":
      "General project core fields are locked. You can still update skills.",
    "page.profile.projects.errors.generalImmutable":
      "General project cannot be deleted",

    "page.profile.projects.form.title.create": "Create project",
    "page.profile.projects.form.title.edit": "Edit project",
    "page.profile.projects.form.fields.name": "Project name",
    "page.profile.projects.form.fields.kind": "Project kind",
    "page.profile.projects.form.fields.startDate": "Start date",
    "page.profile.projects.form.fields.endDate": "End date",
    "page.profile.projects.form.fields.skills": "Project skills",
    "page.profile.projects.form.placeholders.nameCreate":
      "Name of your project",
    "page.profile.projects.form.placeholders.nameEdit": "Update project name",
    "page.profile.projects.form.placeholders.skills": "Select project skills",
    "page.profile.projects.form.actions.cancel": "Cancel",
    "page.profile.projects.form.actions.save": "Save",
    "page.profile.projects.form.errors.nameRequired":
      "Project name is required",
    "page.profile.projects.form.errors.dateInvalid": "Date must be in YYYY-MM-DD format",
    "page.profile.projects.form.errors.endDateBeforeStart":
      "End date cannot be earlier than start date",

    "page.profile.skills.heading": "Encountered skills",
    "page.profile.skills.empty":
      "No skills encountered yet in projects or diary entries.",

    "page.diary.title": "Diary",
    "page.diary.subtitle":
      "Signed in as {label}. Capture what you shipped and the skills you strengthened today.",
    "page.diary.addEntry": "Add new diary entry",
    "page.diary.entriesHeading": "Recent diary entries",
    "page.diary.filters.heading": "Filters",
    "page.diary.filters.project": "Project",
    "page.diary.filters.skills": "Skills",
    "page.diary.filters.fromDate": "From date",
    "page.diary.filters.toDate": "To date",
    "page.diary.filters.allProjects": "All projects",
    "page.diary.filters.apply": "Apply filters",
    "page.diary.filters.clear": "Clear filters",
    "page.diary.filters.empty": "No diary entries match your filters yet.",
    "page.diary.record.edit": "Edit",
    "page.diary.record.delete": "Delete",
    "page.diary.confirm.delete": "Delete this diary entry?",

    "page.diary.importance.prefix": "Importance",
    "page.diary.importance.low": "Low",
    "page.diary.importance.medium": "Medium",
    "page.diary.importance.high": "High",

    "page.diary.form.title.create": "Add diary entry",
    "page.diary.form.title.edit": "Edit diary entry",
    "page.diary.form.fields.date": "Date",
    "page.diary.form.fields.title": "Title",
    "page.diary.form.fields.details": "Details",
    "page.diary.form.fields.skills": "Skills",
    "page.diary.form.fields.importance": "Importance",
    "page.diary.form.fields.project": "Project",
    "page.diary.form.actions.cancel": "Cancel",
    "page.diary.form.actions.save": "Save",
    "page.diary.form.errors.titleRequired": "Title is required",
    "page.diary.form.errors.detailsRequired": "Details are required",
    "page.diary.form.errors.projectRequired": "Project is required",
    "page.diary.form.placeholders.titleCreate": "What did you achieve?",
    "page.diary.form.placeholders.titleEdit": "Update the title",
    "page.diary.form.placeholders.details": "Short description of what happened",
    "page.diary.form.placeholders.skills": "Select skills",
    "page.diary.form.placeholders.project": "Select project",
    "page.diary.toast.loadFailed": "Failed to load diary entries",
    "page.diary.toast.saveFailed": "Failed to save diary entry",
    "page.diary.toast.deleteFailed": "Failed to delete diary entry",
    "page.diary.project.prefix": "Project",

    "page.diary.entry1.date": "2026-03-26",
    "page.diary.entry1.title": "Released profile filter by skill",
    "page.diary.entry1.details":
      "Implemented filtering so achievements can be explored by selected skill tags.",
    "page.diary.entry1.skills": "React, Product thinking",
    "page.diary.entry1.importance": "Importance: High",
    "page.diary.entry2.date": "2026-03-25",
    "page.diary.entry2.title": "Fixed slow dashboard query",
    "page.diary.entry2.details":
      "Refactored data loading to avoid duplicate requests and reduced page load time.",
    "page.diary.entry2.skills": "SQL, Performance optimization",
    "page.diary.entry2.importance": "Importance: Medium",
    "page.diary.entry3.date": "2026-03-22",
    "page.diary.entry3.title": "Documented API output for CV builder",
    "page.diary.entry3.details":
      "Added clear response examples for achievements and linked skills in public docs.",
    "page.diary.entry3.skills": "API design, Technical writing",

    "page.diary.skills.prefix": "Skills",
    "page.diary.entry3.importance": "Importance: High",

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
    "shared.skillsCombobox.createOption": `Додати "{value}"`,

    "page.quiz.title": "Вікторина",
    "page.quiz.description": "Це заготовка сторінки вікторини.",

    "page.profile.title": "Профіль",
    "page.profile.signedInAs": "Увійшли як {label}",
    "page.profile.github.heading": "Профіль GitHub",
    "page.profile.github.avatarAlt": "Аватар користувача {login}",
    "page.profile.github.openLink": "Відкрити профіль GitHub",

    "page.profile.projects.heading": "Проєкти",
    "page.profile.projects.createButton": "Створити проєкт",
    "page.profile.projects.empty": "Поки немає проєктів.",
    "page.profile.projects.confirm.delete": "Видалити цей проєкт?",
    "page.profile.projects.toast.saveFailed": "Не вдалося зберегти проєкт",
    "page.profile.projects.toast.deleteFailed":
      "Не вдалося видалити проєкт",
    "page.profile.projects.kind.label": "Тип",
    "page.profile.projects.kind.general": "Загальний",
    "page.profile.projects.kind.company": "Компанійний",
    "page.profile.projects.kind.personal": "Особистий",
    "page.profile.projects.startDate.label": "Дата початку",
    "page.profile.projects.endDate.label": "Дата завершення",
    "page.profile.projects.notSet": "Не вказано",
    "page.profile.projects.skills.label": "Навички",
    "page.profile.projects.skills.empty": "Навички не вказані",
    "page.profile.projects.actions.edit": "Редагувати",
    "page.profile.projects.actions.delete": "Видалити",
    "page.profile.projects.generalLock":
      "Основні поля загального проєкту заблоковані. Ви все ще можете оновлювати навички.",
    "page.profile.projects.errors.generalImmutable":
      "Загальний проєкт не можна видалити",

    "page.profile.projects.form.title.create": "Створити проєкт",
    "page.profile.projects.form.title.edit": "Редагувати проєкт",
    "page.profile.projects.form.fields.name": "Назва проєкту",
    "page.profile.projects.form.fields.kind": "Тип проєкту",
    "page.profile.projects.form.fields.startDate": "Дата початку",
    "page.profile.projects.form.fields.endDate": "Дата завершення",
    "page.profile.projects.form.fields.skills": "Навички проєкту",
    "page.profile.projects.form.placeholders.nameCreate":
      "Назва вашого проєкту",
    "page.profile.projects.form.placeholders.nameEdit":
      "Оновіть назву проєкту",
    "page.profile.projects.form.placeholders.skills":
      "Оберіть навички проєкту",
    "page.profile.projects.form.actions.cancel": "Скасувати",
    "page.profile.projects.form.actions.save": "Зберегти",
    "page.profile.projects.form.errors.nameRequired":
      "Назва проєкту є обов'язковою",
    "page.profile.projects.form.errors.dateInvalid":
      "Дата має бути у форматі YYYY-MM-DD",
    "page.profile.projects.form.errors.endDateBeforeStart":
      "Дата завершення не може бути раніше дати початку",

    "page.profile.skills.heading": "Задіяні навички",
    "page.profile.skills.empty":
      "Поки немає навичок, задіяних у проєктах або записах щоденника.",

    "page.diary.title": "Щоденник",
    "page.diary.subtitle":
      "Увійшли як {label}. Запишіть, що ви здали сьогодні, і які навички зміцнили.",
    "page.diary.addEntry": "Додати новий запис",
    "page.diary.entriesHeading": "Останні записи щоденника",
    "page.diary.filters.heading": "Фільтри",
    "page.diary.filters.project": "Проєкт",
    "page.diary.filters.skills": "Навички",
    "page.diary.filters.fromDate": "Від дати",
    "page.diary.filters.toDate": "До дати",
    "page.diary.filters.allProjects": "Усі проєкти",
    "page.diary.filters.apply": "Застосувати фільтри",
    "page.diary.filters.clear": "Скинути фільтри",
    "page.diary.filters.empty": "Немає записів, що відповідають фільтрам.",
    "page.diary.record.edit": "Редагувати",
    "page.diary.record.delete": "Видалити",
    "page.diary.confirm.delete": "Видалити цей запис щоденника?",

    "page.diary.importance.prefix": "Важливість",
    "page.diary.importance.low": "Низька",
    "page.diary.importance.medium": "Середня",
    "page.diary.importance.high": "Висока",

    "page.diary.form.title.create": "Додати запис до щоденника",
    "page.diary.form.title.edit": "Редагувати запис",
    "page.diary.form.fields.date": "Дата",
    "page.diary.form.fields.title": "Заголовок",
    "page.diary.form.fields.details": "Деталі",
    "page.diary.form.fields.skills": "Навички",
    "page.diary.form.fields.importance": "Важливість",
    "page.diary.form.fields.project": "Проєкт",
    "page.diary.form.actions.cancel": "Скасувати",
    "page.diary.form.actions.save": "Зберегти",
    "page.diary.form.errors.titleRequired": "Заголовок є обов'язковим",
    "page.diary.form.errors.detailsRequired": "Деталі є обов'язковими",
    "page.diary.form.errors.projectRequired": "Проєкт є обов'язковим",
    "page.diary.form.placeholders.titleCreate": "Якого результату ви досягли?",
    "page.diary.form.placeholders.titleEdit": "Оновіть заголовок",
    "page.diary.form.placeholders.details": "Коротко опишіть, що сталося",
    "page.diary.form.placeholders.skills": "Оберіть навички (напр., React, SQL)",
    "page.diary.form.placeholders.project": "Оберіть проєкт",
    "page.diary.toast.loadFailed": "Не вдалося завантажити записи щоденника",
    "page.diary.toast.saveFailed": "Не вдалося зберегти запис щоденника",
    "page.diary.toast.deleteFailed": "Не вдалося видалити запис щоденника",
    "page.diary.project.prefix": "Проєкт",

    "page.diary.entry1.date": "2026-03-26",
    "page.diary.entry1.title": "Запущено фільтр профілю за навичками",
    "page.diary.entry1.details":
      "Реалізовано фільтрацію, щоб досягнення можна було переглядати за обраними тегами навичок.",
    "page.diary.entry1.skills": "React, Product thinking",
    "page.diary.entry1.importance": "Важливість: Висока",
    "page.diary.entry2.date": "2026-03-25",
    "page.diary.entry2.title": "Виправлено повільний запит дашборду",
    "page.diary.entry2.details":
      "Перероблено завантаження даних без дубльованих запитів і зменшено час завантаження сторінки.",
    "page.diary.entry2.skills": "SQL, Performance optimization",
    "page.diary.entry2.importance": "Важливість: Середня",
    "page.diary.entry3.date": "2026-03-22",
    "page.diary.entry3.title": "Задокументовано API-відповідь для CV-конструктора",
    "page.diary.entry3.details":
      "Додано зрозумілі приклади відповіді для досягнень і пов'язаних навичок у публічній документації.",
    "page.diary.entry3.skills": "API design, Technical writing",

    "page.diary.skills.prefix": "Навички",
    "page.diary.entry3.importance": "Важливість: Висока",

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

