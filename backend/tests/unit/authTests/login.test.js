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
        userRepo.findByEmail.mockResolvedValue({
            id:1,
            email:"test@test.com",
            senha:"hashedPassword"
        })

        bcrypt.compare.mockResolvedValue(true)

        jwt.sign.mockReturnValue("fake-token")

        const result = await login("test@test.com", "testpass")

        expect(result).toEqual({
            token:"fake-token"
        })

        expect(userRepo.findByEmail).toHaveBeenCalledWith("test@test.com")

        expect(bcrypt.compare).toHaveBeenCalledWith("testpass", "hashedPassword")

        expect(jwt.sign).toHaveBeenCalledWith(
            {id:1},
            process.env.JWT_SECRET,
            {expiresIn:"24h"}
        )
    })

    it("deve retornar erro se não existir usuario nao possuir cadastro(email not found)", async()=>{
        userRepo.findByEmail.mockResolvedValue(null)

        await expect(login("test@test.com", "testpass")).rejects.toThrow("Email não encontrado")

        expect(bcrypt.compare).not.toHaveBeenCalled()
    })

    it("deve retornar erro em caso de senha incorreta", async()=>{
        userRepo.findByEmail.mockResolvedValue({
            id:1,
            email:"test@test",
            senha:"hashedPassword"
        })

        bcrypt.compare.mockResolvedValue(false)

        await expect(login("test@test", "incorrectPass")).rejects.toThrow("Credenciais inválidas")

        expect(bcrypt.compare).toHaveBeenCalled()
    })
})