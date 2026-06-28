import prisma from "../config/prisma.js"

export async function findByEmail(email){
    return prisma.user.findUnique({
        where:{
            email
        }
    })
}

export async function createUser(email, password) {
    return prisma.user.create({
        data:{
            email,
            password,
        },
        select:{
            id:true,
            email:true
        }
    })
}