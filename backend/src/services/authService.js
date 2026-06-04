import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as userRepository from "../repositories/userRepository.js"


export async function checkIfEmailExists(email){
        const user = await userRepository.findByEmail(email)
        return !!user
}

export async function register(email, senha) {
        const emailExists = await checkIfEmailExists(email)
        if (emailExists) throw new Error("Email já em uso")
        const hashedPassword = await bcrypt.hash(senha, 10)
        const newUser = await userRepository.createUser(email, hashedPassword)
        return newUser
}

export async function login (email, senha){
        const user = await userRepository.findByEmail(email)
        if (!user) throw new Error("Email não encontrado")
        
        const validaSenha = await bcrypt.compare(senha, user.senha)
        if(!validaSenha) throw new Error("Credenciais inválidas")
        
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        return {token}
 
}