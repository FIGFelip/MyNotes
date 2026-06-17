import {body} from "express-validator"

export const validateLogin = [
    body("email")
    .notEmpty()
    .isEmail(),

    body("senha")
    .notEmpty()
]