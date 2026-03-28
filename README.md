## Show Your SE Level

Show Your SE Level is a daily achievement diary for developers.

The app helps users record what they shipped or learned each day and link those achievements to the skills they improved. Over time, this creates a profile timeline and project-focused growth history that can be filtered (for example, by skill) and later consumed by external tools, such as CV builders, through API endpoints.

Built with Next.js.

## Run Locally

### 1) Copy environment variables

```bash
cp .env.example .env.local
```

### 2) Start PostgreSQL (Docker)

```bash
npm run db:up
```

### 3) Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## PostgreSQL (Docker)

The project includes a local PostgreSQL database in `docker-compose.yml`.

### Database scripts

- `npm run db:up` - start the PostgreSQL container in the background
- `npm run db:down` - stop containers and remove the network
- `npm run db:logs` - tail PostgreSQL logs

### Default connection values

With the default `.env.example` values:

- host: `localhost`
- port: `5432`
- database: `show_your_se_level`
- username: `postgres`
- password: `postgres`
- `DATABASE_URL`: `postgresql://postgres:postgres@localhost:5432/show_your_se_level`
- `POSTGRES_URL`: `postgresql://postgres:postgres@localhost:5432/show_your_se_level`
- `PRISMA_DATABASE_URL`: `postgresql://postgres:postgres@localhost:5432/show_your_se_level`
