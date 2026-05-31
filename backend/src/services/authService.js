import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as userRepository from "../repositories/userRepository.js"

export async function register(email, senha) {
        const userExists = await userRepository.findByEmail(email)
        if (userExists) throw new Error("Email já em uso")
        const hashedPassword = bcrypt.hash(senha)
        const newUser = userRepository.createUser(email, hashedPassword)
        return newUser
}

export async function login (email, senha){
        const user = await userRepository.findByEmail(email)
        if (!user) throw new Error("Email não encontrado")
        
        const validaSenha = await bcrypt.compare(senha, user.senha)
        if(!validaSenha) throw new Error("Credenciais inválidas")
        
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        return json({token})
 
}