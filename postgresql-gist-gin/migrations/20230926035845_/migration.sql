-- CreateTable
CREATE TABLE "duplicate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "gist" TEXT NOT NULL,
    "gin" TEXT NOT NULL,

    CONSTRAINT "duplicate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "duplicate_index_idx" ON "duplicate"("index");

-- CreateIndex
CREATE INDEX "duplicate_gist_idx" ON "duplicate" USING GIST ("gist" gist_trgm_ops);

-- CreateIndex
CREATE INDEX "duplicate_gin_idx" ON "duplicate" USING GIN ("gin" gin_trgm_ops);

COPY "duplicate"(name, index, gist, gin)
FROM '/duplicate.csv'
DELIMITER ','
CSV HEADER;