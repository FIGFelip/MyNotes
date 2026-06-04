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
    it("Deve criar usuário corretamente", async()=>{
        userRepo.createUser.mockResolvedValue({
            email:"test@test.com",
        })

        const result = await register("test@test.com", "testpass")

        expect(result).toEqual({
            email:"test@test.com"
        })

        expect(userRepo.createUser).toHaveBeenCalledWith("test@test.com", expect.any(String))
        const hashedPassword = userRepo.createUser.mock.calls[0][1]

        const validPassword = await bcrypt.compare(
            "testpass",
            hashedPassword
        )

        expect(validPassword).toBe(true)
    })
    it("Deve retornar erro se email já estiver em uso", async()=>{
        userRepo.findByEmail.mockResolvedValue({
            email:"test@test.com"
        })

        await expect(register("test@test.com", "testpass")).rejects.toThrow("Email já em uso")

        expect(userRepo.findByEmail).toHaveBeenCalledWith("test@test.com")

        expect(userRepo.createUser).not.toHaveBeenCalled()
    })
})
