import { client } from "./client"
import { AuthResponse, RegisterResponse } from "../types/auth"

type LoginDto = {
    email:string
    password:string
}

type RegisterDto={
    email:string
    password:string
}

export async function login(data:LoginDto): Promise<AuthResponse>{
    return client.post<AuthResponse>("/auth/login", data)
}

export async function register(data:RegisterDto):Promise<RegisterResponse>{
    return client.post<RegisterResponse>("/auth/register", data)
}