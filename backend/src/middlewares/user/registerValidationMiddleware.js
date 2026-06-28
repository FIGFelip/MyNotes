import { body, validationResult } from "express-validator";

export const validateRegister =
  process.env.NODE_ENV === "test"
    ? (req, res, next) => next()
    : [
        body("email").isEmail().notEmpty().withMessage("Email inválido"),

        body("password")
          .isStrongPassword({
            minLength: 8,
            minNumbers: 1,
            minUppercase: 1,
            minLowercase: 1,
            minSymbols: 0,
          })
          .withMessage(
            "Senha deve conter min de 8 caracteres, uma maiúscula, uma minúscula e um número",
          ),

        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ];
