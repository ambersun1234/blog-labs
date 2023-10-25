import { createLogger, transports, format } from "winston";

import { LOG_LEVEL } from "../env";
import { WinstonLogLevel } from "../constant/constant";

const { json, timestamp, combine } = format;

if (!!LOG_LEVEL && !WinstonLogLevel.includes(LOG_LEVEL)) {
  console.log(`Invalid logger option ${LOG_LEVEL}`);
  process.exit(1);
}

export const logger = createLogger({
  transports: [new transports.Console()],
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
  level: LOG_LEVEL,
});
