import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const ITERATION = 100;

const tons = (timestamp: number[]): number => {
  return timestamp[0] * 1e9 + timestamp[1];
};

const findName = async (conn: PrismaClient, field: string, name: string) => {
  return await conn.$queryRawUnsafe(`--sql
        select id
        from "unique"
        where ${field} % '${name}'
    `);
};

const benchmark = async (
  conn: PrismaClient,
  name: string
): Promise<number[][]> => {
  const fields = ["name", "index", "gist", "gin"];

  let benchmarkResult = new Array(ITERATION);
  for (let i = 0; i < ITERATION; i++) {
    benchmarkResult[i] = new Array(fields.length);
  }

  for (let i = 0; i < fields.length; i++) {
    for (let j = 0; j < ITERATION; j++) {
      const startTime = tons(process.hrtime());
      await findName(conn, fields[i], name);
      const endTime = tons(process.hrtime());

      benchmarkResult[j][i] = endTime - startTime;
    }
  }

  return benchmarkResult;
};

const write2file = async (result: number[][]) => {
  const logger = fs.createWriteStream(
    path.join(
      path.dirname(path.resolve(fileURLToPath(import.meta.url))),
      "./benchmark-unique.txt"
    ),
    { flags: "w" }
  );
  result.forEach((item, index) => {
    logger.write(`${index} ${item[0]} ${item[1]} ${item[2]} ${item[3]}\n`);
  });
  logger.end();
};

await write2file(await benchmark(new PrismaClient(), "Celise"));
