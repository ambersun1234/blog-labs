import { PrismaClient } from "@prisma/client";

export const newConnection = (): PrismaClient => {
  return new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
};
