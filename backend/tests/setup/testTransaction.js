import { beforeAll, beforeEach, afterAll, afterEach } from "vitest";
import prisma from "../../src/config/prisma";

let transaction = null

beforeAll(async()=>{
    transaction = await prisma.$connect()
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
