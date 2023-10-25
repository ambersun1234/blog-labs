import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime";

export type PrismaTransaction = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;
export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
