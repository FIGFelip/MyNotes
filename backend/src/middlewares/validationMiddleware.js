import { body, validationResult } from "express-validator";

export const validateNote = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Título Obrigatório")
    .isLength({ max: 100 })
    .withMessage("Máximo de 100 caracteres"),

    body("body")
    .trim()
    .notEmpty()
    .withMessage("Conteúdo obrigatório"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];
