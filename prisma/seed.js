/** @type {string[]} */
const SKILLS = [
  // ── Languages & runtimes ─────────────────────────────────────────────────
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Deno",
  "Bun",

  // ── Frontend frameworks & libraries ──────────────────────────────────────
  "React",
  "Next.js",
  "Vue.js",
  "Nuxt.js",
  "Angular",
  "Svelte",
  "SvelteKit",
  "Solid.js",
  "Remix",
  "Astro",
  "Qwik",

  // ── State management ─────────────────────────────────────────────────────
  "Redux",
  "Zustand",
  "Jotai",
  "Recoil",
  "MobX",
  "XState",
  "React Context",

  // ── Data fetching & async ─────────────────────────────────────────────────
  "TanStack Query",
  "SWR",
  "Apollo Client",
  "tRPC",
  "GraphQL",
  "REST API integration",
  "WebSockets",
  "Server-Sent Events",

  // ── Styling ───────────────────────────────────────────────────────────────
  "CSS",
  "Sass / SCSS",
  "Tailwind CSS",
  "CSS Modules",
  "Styled Components",
  "Emotion",
  "CSS-in-JS",
  "Animations & transitions",
  "Responsive design",
  "Accessibility (a11y)",

  // ── UI component ecosystems ───────────────────────────────────────────────
  "shadcn/ui",
  "Radix UI",
  "Headless UI",
  "Material UI",
  "Ant Design",
  "Chakra UI",
  "Storybook",

  // ── Forms & validation ────────────────────────────────────────────────────
  "React Hook Form",
  "Formik",
  "Zod",
  "Yup",
  "Valibot",

  // ── Build tooling & bundlers ──────────────────────────────────────────────
  "Vite",
  "Webpack",
  "esbuild",
  "Turbopack",
  "Rollup",
  "Parcel",

  // ── Backend frameworks ────────────────────────────────────────────────────
  "Express.js",
  "Fastify",
  "NestJS",
  "Hono",
  "Koa",
  "Elysia",

  // ── API design & protocols ────────────────────────────────────────────────
  "REST API design",
  "GraphQL API design",
  "OpenAPI / Swagger",
  "API versioning",
  "Webhooks",
  "tRPC server",

  // ── Databases & ORMs ──────────────────────────────────────────────────────
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "MongoDB",
  "Redis",
  "SQL",
  "Prisma",
  "Drizzle ORM",
  "TypeORM",
  "Mongoose",

  // ── Auth & security ───────────────────────────────────────────────────────
  "Authentication",
  "JWT",
  "OAuth / OIDC",
  "NextAuth.js",
  "Passport.js",
  "Security best practices",
  "CORS & CSP",
  "Rate limiting",

  // ── Testing ───────────────────────────────────────────────────────────────
  "Unit testing",
  "Integration testing",
  "E2E testing",
  "Vitest",
  "Jest",
  "Playwright",
  "Cypress",
  "Testing Library",

  // ── DevOps & infrastructure ───────────────────────────────────────────────
  "Docker",
  "Docker Compose",
  "CI/CD",
  "GitHub Actions",
  "Kubernetes",
  "Serverless",
  "Edge functions",
  "Nginx",

  // ── Observability ─────────────────────────────────────────────────────────
  "Logging",
  "Error monitoring",
  "Performance monitoring",
  "OpenTelemetry",

  // ── Architecture & patterns ───────────────────────────────────────────────
  "System design",
  "Database design",
  "Microservices",
  "Event-driven architecture",
  "CQRS",
  "Domain-driven design",
  "Refactoring",
  "Design patterns",
  "Caching strategies",
  "Message queues",

  // ── Developer practice ────────────────────────────────────────────────────
  "Performance optimization",
  "Code review",
  "Technical writing",
  "API documentation",
  "Debugging",
  "Git",
  "Agile / Scrum",
  "Product thinking",
  "Pair programming",

  // ── Web platform ─────────────────────────────────────────────────────────
  "Web APIs",
  "Service Workers",
  "Progressive Web Apps",
  "Web Components",
  "Browser DevTools",
  "SEO",
  "Core Web Vitals",
];

async function main() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  try {
    const result = await prisma.skill.createMany({
      data: SKILLS.map((name) => ({ name })),
      skipDuplicates: true,
    });

    console.log(`Seeded ${result.count} new skill(s) (duplicates skipped).`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
