## Show Your SE Level

Daily achievement diary for developers, built with Next.js.

## Getting Started

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Start PostgreSQL with Docker:

```bash
npm run db:up
```

3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## PostgreSQL (Docker)

The project includes a local PostgreSQL database in `docker-compose.yml`.

### Scripts

- `npm run db:up` - starts the PostgreSQL container in the background
- `npm run db:down` - stops containers and removes the network
- `npm run db:logs` - tails PostgreSQL logs

### Default Connection

With the default `.env.example` values:

- host: `localhost`
- port: `5432`
- database: `show_your_se_level`
- username: `postgres`
- password: `postgres`
- `DATABASE_URL`: `postgresql://postgres:postgres@localhost:5432/show_your_se_level`
- `POSTGRES_URL`: `postgresql://postgres:postgres@localhost:5432/show_your_se_level`
- `PRISMA_DATABASE_URL`: `postgresql://postgres:postgres@localhost:5432/show_your_se_level`
