import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const ITERATION = 10000;

const tons = (timestamp: number[]): number => {
  return timestamp[0] * 1e9 + timestamp[1];
};

const findName = async (field: string, name: string) => {
  const conn = new PrismaClient();
  return await conn.$queryRawUnsafe(`--sql
        select id
        from test
        where similarity(${field}, '${name}') > 0
    `);
};

const benchmark = async (name: string): Promise<number[][]> => {
  const fields = ["name", "index", "gist", "gin"];

  let benchmarkResult = new Array(ITERATION);
  for (let i = 0; i < ITERATION; i++) {
    benchmarkResult[i] = new Array(fields.length);
  }

  for (let i = 0; i < fields.length; i++) {
    for (let j = 0; j < ITERATION; j++) {
      const startTime = tons(process.hrtime());
      await findName(fields[i], name);
      const endTime = tons(process.hrtime());

      benchmarkResult[j][i] = endTime - startTime;
    }
  }

  return benchmarkResult;
};

const write2file = async (result: number[][]) => {
  const logger = fs.createWriteStream("./benchmark-unique.csv", { flags: "w" });
  result.forEach((item) => {
    logger.write(`${item[0]},${item[1]},${item[2]},${item[3]}\n`);
  });
  logger.end();
};

const data = await benchmark("Celise");
await write2file(data);
