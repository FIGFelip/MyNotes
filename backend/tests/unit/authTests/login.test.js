import {describe, it, beforeEach, expect, vi} from "vitest"
import * as userRepo from "../../../src/repositories/userRepository.js"
import { login } from "../../../src/services/authService"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

vi.mock("../../../src/repositories/userRepository.js", ()=>({
    login:vi.fn(),
    findByEmail:vi.fn()
}))

vi.mock("jsonwebtoken", ()=>({
    default:{
        sign: vi.fn()
    }
}))

vi.mock("bcrypt", ()=>({
    default:{
        compare: vi.fn()
    }
}))


beforeEach(()=>{
    vi.clearAllMocks()
})

describe("Login", ()=>{
    it("Deve logar corretamente", async()=>{
        const email = `test${crypto.randomUUID()}@test.com`
        userRepo.findByEmail.mockResolvedValue({
            id:1,
            email:email,
            password:"hashedPassword"
        })

        bcrypt.compare.mockResolvedValue(true)

        jwt.sign.mockReturnValue("fake-token")

        const result = await login(email, "testpass")

        expect(result).toEqual({
            token:"fake-token"
        })

        expect(userRepo.findByEmail).toHaveBeenCalledWith(email)

        expect(bcrypt.compare).toHaveBeenCalledWith("testpass", "hashedPassword")

        expect(jwt.sign).toHaveBeenCalledWith(
            {id:1},
            process.env.JWT_SECRET,
            {expiresIn:"2h"}
        )
    })

    it("deve retornar erro se não existir usuario/Não possuir cadastro(email not found)", async()=>{
        userRepo.findByEmail.mockResolvedValue(null)

        await expect(login("test999@test.com", "testpass")).rejects.toThrow("Credenciais inválidas")

        expect(bcrypt.compare).not.toHaveBeenCalled()
    })

    it("deve retornar erro em caso de password incorreta", async()=>{
        userRepo.findByEmail.mockResolvedValue({
            id:1,
            email:"test@test888",
            password:"hashedPassword"
        })

        bcrypt.compare.mockResolvedValue(false)

        await expect(login("test@test888", "incorrectPass")).rejects.toThrow("Credenciais inválidas")

        expect(bcrypt.compare).toHaveBeenCalled()
    })
})