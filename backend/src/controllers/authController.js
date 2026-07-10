import { logger } from "../config/logger.js";
import * as service from "../services/authService.js";

// register
export async function register(req, res) {
  //calling register function from services
  try {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      throw new Error("Campos de email/password faltantes");
    }
    const user = await service.register(email, password);
    if (!user) {
      return res.status(400).json({ message: "Erro ao criar usuário" });
    }
    return res.status(201).json(user);
  } catch (err) {
    if(err.message==="Credenciais inválidas"){
      return res.status(400).json({
      message: err.message,
    });
    }
    logger.error(err.message)
    return res.status(500).json({message:"Erro do servidor"})
    
  }
}

// login
export async function login(req, res) {
  //calling login function from services
  try {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      throw new Error("Campos de email/password faltantes");
    }
    const token = await service.login(email, password);
    if (!token) {
      throw new Error("Token não fornecido");
    }
    return res.status(200).json(token);
  } catch (err) {
    if(err.message==="Credenciais inválidas"){
      return res.status(400).json({
      message: err.message,
    });
    }
    logger.error(err.message)
    return res.status(500).json({message:"Erro do servidor"})
  }
}
