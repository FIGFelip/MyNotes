import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";
import { logger } from "../config/logger.js";

export async function checkIfEmailExists(email) {
  const user = await userRepository.findByEmail(email);
  return !!user;
}

export async function register(email, password) {
  const emailExists = await checkIfEmailExists(email);

  if (emailExists) {
    logger.error("Email já em uso: ", email);
    throw new Error("Credenciais inválidas");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser(email, hashedPassword);
  return newUser;
}

export async function login(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    logger.error("Usuário não encontrado: ", email);
    throw new Error("Credenciais inválidas");
  }

  const validaSenha = await bcrypt.compare(password, user.password);
  if (!validaSenha){
        logger.error("senha incorreta para: ", email)
        throw new Error("Credenciais inválidas");
  } 

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return { token };
}
