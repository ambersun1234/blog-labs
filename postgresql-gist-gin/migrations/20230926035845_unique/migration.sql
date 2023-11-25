-- CreateTable
CREATE TABLE "unique2" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "gist" TEXT NOT NULL,
    "gin" TEXT NOT NULL,

    CONSTRAINT "unique2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "unique2_index_idx" ON "unique2"("index");

-- CreateIndex
CREATE INDEX "unique2_gist_idx" ON "unique2" USING GIST ("gist" gist_trgm_ops);

-- CreateIndex
CREATE INDEX "unique2_gin_idx" ON "unique2" USING GIN ("gin" gin_trgm_ops);

COPY "unique2"(name, index, gist, gin)
FROM '/unique-large.csv'
DELIMITER ','
CSV HEADER;