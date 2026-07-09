import prisma from "../config/prisma.js";

export async function findNotesById(userId){
    return prisma.note.findMany({
        where:{
            userId,
            status:"active"
        }
    })
}


export async function findUniqueNoteById(userId, noteId){
    return prisma.note.findFirst({
        where:{
            id: noteId,
            userId: userId
        }
    })
}

export async function createNewNote(userId, title, body){
    return prisma.note.create({
        data:{
            title,
            body,
            userId
        }
    })
}

export async function editNoteById(id, userId, title, body){
    return prisma.note.updateMany({
        where:{
            id,
            userId,
        },
        data:{
            title,
            body
        }
    })
}

export async function softDeleteById(id, userId){
    const result = await prisma.note.updateMany({
        where:{
            id,
            userId,
        },
        data:{
            status:"inactive",
            deletedAt: new Date()
        }
    })

    if(result.count===0) throw new Error("Nota não encontrada")

    return result
    
}

export async function hardDeleteById(id, userId){
    const result = await prisma.note.deleteMany({
        where:{
            id,
            userId,
            status:"inactive"
        }
    })
    if (result.count===0) throw new Error("Nota não encontrada")
    return result
}

export async function HardDeleteOldNotes(id, userId){
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)
    return prisma.note.deleteMany({
        where:{
            id,
            userId,
            status:"inactive",
            deletedAt:{
                lt:thirtyDaysAgo
            },
        }
    })
}

export async function getFromTrashById(userId){
    return prisma.note.findMany({
        where:{
            userId,
            status:"inactive"
        }
    })
}

export async function restore(id, userId){
    return prisma.note.updateMany({
        where:{
            id,
            userId,
            status:"inactive"
        
        },
        data:{
            status: "active",
            deletedAt:null
        }
        
    })
}