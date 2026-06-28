import app from "../../../src/app.js"
import  request  from "supertest"
import {it , expect, describe } from "vitest"
import prisma from "../../../src/config/prisma.js"

describe("DELETE /notes", ()=>{
    it("Deve deletar nota corretamente", async()=>{

        //register
        const email = `test${crypto.randomUUID()}@test.com`
        const createUserRes = await request(app)
        .post("/auth/register")
        .send({
            email:email,
            password:"testPass"
        })

        if(createUserRes.status !== 201){
            console.log("Erro no register: ", createUserRes.body)
        }

        //login
        const loginRes = await request(app).post("/auth/login").send({
            email:email,
            password:"testPass"
        })

        const token = loginRes.body.token

        if(loginRes.status!==200){
            console.log("Erro no login: ", loginRes.body)
        }

        //create note
        const createNoteRes = await request(app).post("/notes").set("Authorization", `Bearer ${token}`).send({
            title:"testTitle",
            body:"testBody"
        })
        
        //noteId
        const noteId = createNoteRes.body.id


        if(createNoteRes.status!==201){
            console.log("Erro ao criar nota: ", createNoteRes.body)
        }

        //soft delete note
        const softDeleteRes = await request(app).patch(`/notes/${noteId}`).set("Authorization", `Bearer ${token}`).send({
            status: "inactive"
        })

        if(softDeleteRes.status!==200){
            console.log("Erro no soft delete: ", softDeleteRes.body)
        }
        expect(softDeleteRes.status).toBe(200)

        //validando soft delete
        const getFromTrashRes = await request(app).get("/notes/trash").set("Authorization", `Bearer ${token}`)
        expect(getFromTrashRes.status).toBe(200)

        //hard delete
        const thirtyOneDaysAgo = new Date()
        thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate()-31)

        await prisma.note.update({
            where:{
                id:noteId
            },
            data:{
                deletedAt: thirtyOneDaysAgo
            }
        })

        const hardDelete = await request(app).delete(`/notes/trash/${noteId}`).set("Authorization", `Bearer ${token}`)
        expect(hardDelete.status).toBe(200)
        // if(hardDeleteRes.status!=200){
        //     console.log("Erro no hardDelete",hardDeleteRes.body)
        // }
        // expect(hardDeleteRes.status).toBe(200)

        //validando hard delete
        
        const trashAfterHardDel = await request(app).get(`/notes/trash`).set("Authorization", `Bearer ${token}`)
        expect(trashAfterHardDel.body).toStrictEqual({message:"Não há notas na lixeira"})
    })
})

