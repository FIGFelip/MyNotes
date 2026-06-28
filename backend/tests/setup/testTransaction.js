import { beforeAll, beforeEach, afterAll, afterEach } from "vitest";
import prisma from "../../src/config/prisma";

beforeAll(async()=>{
    await prisma.$connect()
})

beforeEach(async()=>{
    await prisma.$executeRaw`BEGIN`
})

afterEach(async()=>{
    await prisma.$executeRaw`ROLLBACK`
})

afterAll(async()=>{
    await prisma.$disconnect()
})
