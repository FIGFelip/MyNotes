import { body } from "express-validator";

export const validateRegister = [
    body("email")
    .isEmail()
    .notEmpty()
    .withMessage("Email inválido"),

    body("senha")
    .isStrongPassword({
        minLength:8,
        minNumbers:1,
        minUppercase:1,
        minLowercase:1,
        minSymbols:0,
    })
    .withMessage("Senha deve conter min de 8 caracteres, uma maiúscula, uma minúscula e um número")
]