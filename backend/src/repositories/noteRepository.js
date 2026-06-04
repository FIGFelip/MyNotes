import prisma from "../config/prisma";

export async function findNotesById(userId){
    return prisma.note.findMany({
        where:{
            user_id:userId,
            status:{
                not: "inactive"
            }
        }
    })
}

export async function createNewNote(userId, title, body){
    return prisma.note.create({
        data:{
            title,
            body,
            user_id:userId
        }
    })
}

export async function editNoteById(id, userId, title, body){
    return prisma.note.updateMany({
        where:{
            id,
            user_id:userId
        },
        data:{
            title,
            body
        }
    })
}

export async function softDeleteById(id, userId){
    return prisma.note.updateMany({
        where:{
            is,
            user_id:userId
        },
        data:{
            status:"inactive",
            deleted_at: new Date()
        }
    })
}

export async function hardDeleteById(id, userId){
    const thirtyDaysAgo = new Date()

    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)

    return prisma.note.deleteMany({
        where:{
            id,
            userId,
            status:"inactive",
            deleted_at:{
                lt: thirtyDaysAgo
            }
        }
    })
}