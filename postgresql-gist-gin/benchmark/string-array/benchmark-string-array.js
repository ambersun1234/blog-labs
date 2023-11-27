import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const ITERATION = 100;
const tons = (timestamp) => {
    return timestamp[0] * 1e9 + timestamp[1];
};
const findName = async (conn, field, name) => {
    return await conn.$queryRawUnsafe(`--sql
        select id
        from "strArray"
        where ${field} @@ '${name}'
    `);
};
const benchmark = async (conn, name) => {
    const fields = ["origin", "gist", "gin"];
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
const write2file = async (result) => {
    const logger = fs.createWriteStream(path.join(path.dirname(path.resolve(fileURLToPath(import.meta.url))), "/benchmark-string-array.txt"), { flags: "w" });
    result.forEach((item, index) => {
        logger.write(`${index} ${item[0]} ${item[1]} ${item[2]}\n`);
    });
    logger.end();
};
await write2file(await benchmark(new PrismaClient(), `{"Latiea","Tiffaine"}`));
