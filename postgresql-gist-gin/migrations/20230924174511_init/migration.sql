CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "gist" TEXT NOT NULL,
    "gin" TEXT NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "test_index_idx" ON "test"("index");

-- CreateIndex
CREATE INDEX "test_gist_idx" ON "test" USING GIST ("gist" gist_trgm_ops);

-- CreateIndex
CREATE INDEX "test_gin_idx" ON "test" USING GIN ("gin" gin_trgm_ops);

COPY test(name, index, gist, gin)
FROM '/unique.csv'
DELIMITER ','
CSV HEADER;