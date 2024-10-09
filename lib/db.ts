import { PrismaClient } from "@prisma/client";

//to avoid hot reload in dev enviroment of Next.js creating multiple instances of prisma
declare global {
    var prisma: PrismaClient | undefined;
}

//this line is for production
export const db = globalThis.prisma || new PrismaClient();

//to avoid hot reload in dev enviroment
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

