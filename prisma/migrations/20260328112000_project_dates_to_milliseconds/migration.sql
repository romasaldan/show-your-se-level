-- AlterTable
ALTER TABLE "public"."Project"
ALTER COLUMN "startDate" TYPE BIGINT
USING (
  CASE
    WHEN "startDate" IS NULL THEN NULL
    WHEN "startDate" ~ '^\d+$' THEN "startDate"::BIGINT
    WHEN "startDate" ~ '^\d{4}-\d{2}-\d{2}$' THEN (EXTRACT(EPOCH FROM ("startDate"::DATE)) * 1000)::BIGINT
    ELSE NULL
  END
),
ALTER COLUMN "endDate" TYPE BIGINT
USING (
  CASE
    WHEN "endDate" IS NULL THEN NULL
    WHEN "endDate" ~ '^\d+$' THEN "endDate"::BIGINT
    WHEN "endDate" ~ '^\d{4}-\d{2}-\d{2}$' THEN (EXTRACT(EPOCH FROM ("endDate"::DATE)) * 1000)::BIGINT
    ELSE NULL
  END
);
