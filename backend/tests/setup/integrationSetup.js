import { beforeEach } from "vitest"
import prisma from "../../src/config/prisma.js"


beforeEach(async()=>{
    await prisma.note.deleteMany()
    await prisma.user.deleteMany()
})