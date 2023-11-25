CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS intarray;

-- CreateTable
CREATE TABLE "unique" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "gist" TEXT NOT NULL,
    "gin" TEXT NOT NULL,

    CONSTRAINT "unique_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "unique_index_idx" ON "unique"("index");

-- CreateIndex
CREATE INDEX "unique_gist_idx" ON "unique" USING GIST ("gist" gist_trgm_ops);

-- CreateIndex
CREATE INDEX "unique_gin_idx" ON "unique" USING GIN ("gin" gin_trgm_ops);

COPY "unique"(name, index, gist, gin)
FROM '/unique.csv'
DELIMITER ','
CSV HEADER;