import request from "supertest"
import {it, describe, expect} from "vitest"
import app from "../../../src/app.js"

describe("Recover /trash/id", ()=>{
    it("deve restaurar uma nota da lixeira", async()=>{
        //register
        const email = `test${crypto.randomUUID()}@test.com`
        const createUserRes = await request(app)
        .post("/auth/register")
        .send({
            email:email,
            senha:"testPass"
        })

        if(createUserRes.status !== 201){
            console.log("Erro no register: ", createUserRes.body)
        }

        //login
        const loginRes = await request(app).post("/auth/login").send({
            email:email,
            senha:"testPass"
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

        expect(createNoteRes.status).toBe(201)
        
        //noteId
        const noteId = createNoteRes.body.id


        if(createNoteRes.status!==201){
            console.log("Erro ao criar nota: ", createNoteRes.body)
        }

        //soft delete note
        const softDeleteRes = await request(app).patch(`/notes/${noteId}`).set("Authorization", `Bearer ${token}`).send({
            status: "inactive"
        })

        if(softDeleteRes.status!==204){
            console.log("Erro no soft delete: ", softDeleteRes.body)
        }
        expect(softDeleteRes.status).toBe(204)

        //validando soft delete
        const getFromTrashRes = await request(app).get("/notes/trash").set("Authorization", `Bearer ${token}`)

        expect(getFromTrashRes.status).toBe(200)

        //recovering note
        const recoverRes = await request(app).patch(`/notes/trash/${noteId}/recover`).set("Authorization", `Bearer ${token}`).send({
            status:"active"
        })
        expect(recoverRes.status).toBe(200)

        //validando recover
        const trashAfterRecoverRes = await request(app).get("/notes/trash").set("Authorization", `Bearer ${token}`)
        expect(trashAfterRecoverRes.body).toStrictEqual({message:"Não há notas na lixeira"})

    })
})