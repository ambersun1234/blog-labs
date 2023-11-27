-- CreateTable
CREATE TABLE "strArray" (
    "id" SERIAL NOT NULL,
    "raw" TEXT[],
    "origin" tsvector,
    "gist" tsvector,
    "gin" tsvector,

    CONSTRAINT "strArray_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strArray2" (
    "id" SERIAL NOT NULL,
    "raw" TEXT[],
    "origin" tsvector,
    "gist" tsvector,
    "gin" tsvector,

    CONSTRAINT "strArray2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "strArray_gist_idx" ON "strArray" USING GIST ("gist");

-- CreateIndex
CREATE INDEX "strArray_gin_idx" ON "strArray" USING GIN ("gin");

-- CreateIndex
CREATE INDEX "strArray2_gist_idx" ON "strArray2" USING GIST ("gist");

-- CreateIndex
CREATE INDEX "strArray2_gin_idx" ON "strArray2" USING GIN ("gin");

COPY "strArray"("raw")
FROM '/str-array.csv'
DELIMITER '@' QUOTE '"' ESCAPE '\'
CSV HEADER;

UPDATE "strArray" SET origin = array_to_tsvector("raw");
UPDATE "strArray" SET gist = array_to_tsvector("raw");
UPDATE "strArray" SET gin = array_to_tsvector("raw");

COPY "strArray2"("raw")
FROM '/str-array-large.csv'
DELIMITER '@' QUOTE '"' ESCAPE '\'
CSV HEADER;

UPDATE "strArray2" SET index = array_to_tsvector(origin);
UPDATE "strArray2" SET gist = array_to_tsvector(origin);
UPDATE "strArray2" SET gin = array_to_tsvector(origin);
