import { expect, vi, it, describe, beforeEach} from "vitest";
import * as userRepo from "../../../src/repositories/userRepository.js"
import { register } from "../../../src/services/authService.js";
import bcrypt from "bcrypt"

vi.mock("../../../src/repositories/userRepository.js", ()=>({
    createUser: vi.fn(),
    findByEmail:vi.fn()
}))

beforeEach(()=>{
    vi.clearAllMocks()
})

describe("Create user", ()=>{
    const email = `test${crypto.randomUUID()}@test.com`
    it("Deve criar usuário corretamente", async()=>{
        userRepo.createUser.mockResolvedValue({
            email:email,
        })

        const result = await register(email, "testpass")

        expect(result).toEqual({
            email:email
        })

        expect(userRepo.createUser).toHaveBeenCalledWith(email, expect.any(String))
        const hashedPassword = userRepo.createUser.mock.calls[0][1]

        const validPassword = await bcrypt.compare(
            "testpass",
            hashedPassword
        )

        expect(validPassword).toBe(true)
    })
    it("Deve retornar erro se email já estiver em uso", async()=>{
        userRepo.findByEmail.mockResolvedValue({
            email:email
        })

        await expect(register(email, "testpass")).rejects.toThrow("Credenciais inválidas")

        expect(userRepo.findByEmail).toHaveBeenCalledWith(email)

        expect(userRepo.createUser).not.toHaveBeenCalled()
    })
})
