import { PrismaClient } from "@prisma/client";

const newConnection = (): PrismaClient => {
    return new PrismaClient();
};

export const connection = newConnection();
