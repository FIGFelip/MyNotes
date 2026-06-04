import prisma from "../src/config/prisma.js"
import { beforeEach } from "vitest"

beforeEach(async () =>{
    await prisma.note.deleteMany()
    await prisma.user.deleteMany()
})