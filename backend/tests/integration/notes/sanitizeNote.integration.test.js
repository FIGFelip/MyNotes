import {it, describe, expect} from "vitest"
import request from "supertest"
import app from "../../../src/app.js"

describe("Sanitize POST/notes", ()=>{
    it("Deve sanitizar uma note antes de criá-la", async()=>{
        //register
        const email = `test${crypto.randomUUID()}@test.com`
        const user = await request(app)
        .post("/auth/register")
        .send({
            email:email,
            senha:"testPass"
        })

        if(user.status!==201){
            console.log("erro criando user: ", user.body)
        }
        expect(user.status).toBe(201)
        

        //login
        const userLogin = await request(app)
        .post("/auth/login")
        .send({
            email:email,
            senha:"testPass"
        })
        const token = userLogin.body.token
        if(userLogin.status!==200){
            console.log("Erro no login do user: ", userLogin.body)
        }
        expect(userLogin.status).toBe(200)

        const XSSnote = await request(app)
        .post("/notes")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title:"<script>alert('xss scritp')</script>",
            body:"<img src=x onerror='alert(1)'>"
        })

        if(XSSnote.status!==400){
            console.log("Xss note post error: ", XSSnote.body)
        }
        expect(XSSnote.status).toBe(400)
        expect(XSSnote.body.errors).toBeDefined()
        expect(XSSnote.body.errors[0].msg).toBe("Título Obrigatório")
    })
})