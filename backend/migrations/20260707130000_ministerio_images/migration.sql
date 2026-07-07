-- Add image upload fields to Ministerio
ALTER TABLE "Ministerio" ADD COLUMN IF NOT EXISTS "heroImage" JSONB;
ALTER TABLE "Ministerio" ADD COLUMN IF NOT EXISTS "logo" JSONB;

-- Create MinisterioLeader table
CREATE TABLE IF NOT EXISTS "MinisterioLeader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "photo" JSONB,
    "photoUrl" TEXT NOT NULL DEFAULT '',
    "ministerio" TEXT,

    CONSTRAINT "MinisterioLeader_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "MinisterioLeader_ministerio_idx" ON "MinisterioLeader"("ministerio");

ALTER TABLE "MinisterioLeader"
  DROP CONSTRAINT IF EXISTS "MinisterioLeader_ministerio_fkey";

ALTER TABLE "MinisterioLeader"
  ADD CONSTRAINT "MinisterioLeader_ministerio_fkey"
  FOREIGN KEY ("ministerio") REFERENCES "Ministerio"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
