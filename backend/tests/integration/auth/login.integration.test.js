import { describe, it, expect } from "vitest"
import request  from "supertest"
import app from "../../../src/app.js"


//happy path-----
describe("POST/login", ()=>{
    it("Deve logar com sucesso", async()=>{
         
        //register
        const email = `test${crypto.randomUUID()}@test.com`
        const registerResponse = await request(app)
        .post("/auth/register")
        .send({
            email:email,
            senha:"testpass"
        })

        expect(registerResponse.status).toBe(201)
        expect(registerResponse.body).toHaveProperty("id")


        //login
        const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email:email,
            senha:"testpass"
        })

        if(loginResponse.status!==200){
            console.log("Erro no login: ", loginResponse.body)
        }
        expect(loginResponse.status).toBe(200)
        
        expect(loginResponse.body).toHaveProperty("token")
    })
})

//sad path-----
describe("Error POST/login", ()=>{
    it("Deve retornar erro se email não existir", async()=>{
        //register
        const registerResponse = await request(app)
        .post("/auth/register")
        .send({
            email:"test@test.com",
            senha:"testpass"
        })

        expect(registerResponse.status).toBe(201)
        expect(registerResponse.body).toHaveProperty("id")


        //login
        const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email:"wrong@email",
            senha:"testpass"
        })

        expect(loginResponse.status).toBe(400)
        expect(loginResponse.body.message).toBe("Email não encontrado")
    })

    it("Deve retornar erro se não houver email/senha", async()=>{
        // missing email

        //register
        const registerResponse = await request(app)
        .post("/auth/register")
        .send({
            email:"test@test.com",
            senha:"testpass"
        })

        expect(registerResponse.status).toBe(201)
        expect(registerResponse.body).toHaveProperty("id")


        //login
        const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email:"    ",
            senha:"testpass"
        })

        expect(loginResponse.status).toBe(400)
        expect(loginResponse.body.message).toBe("Campos de email/senha faltantes")


        //missing password
        //register
        const registerResponse2 = await request(app)
        .post("/auth/register")
        .send({
            email:"test@test2.com",
            senha:"testpass"
        })

        if(registerResponse2.status!==201){
            console.log("Erro no register2: ", registerResponse2.body)
        }
        expect(registerResponse2.status).toBe(201)
        expect(registerResponse2.body).toHaveProperty("id")


        //login
        const loginResponse2 = await request(app)
        .post("/auth/login")
        .send({
            email:"test@test2.com",
            senha:"      "
        })

        expect(loginResponse2.status).toBe(400)
        expect(loginResponse2.body.message).toBe("Campos de email/senha faltantes")
    })
    it("Deve retornar erro se credenciais forem inválidas", async()=>{
        const registerResponse = await request(app)
        .post("/auth/register")
        .send({
            email:"test@test.com",
            senha:"testpass"
        })

        expect(registerResponse.status).toBe(201)
        expect(registerResponse.body).toHaveProperty("id")


        //login
        const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email:"test@test.com",
            senha:"wrongPass"
        })

        expect(loginResponse.status).toBe(400)
        expect(loginResponse.body.message).toBe("Credenciais inválidas")
    })
})