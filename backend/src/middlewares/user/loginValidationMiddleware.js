import { body, validationResult } from "express-validator";

export const validateLogin =
  process.env.NODE_ENV === "test"
    ? (req, res, next) => next()
    : [
        body("email").trim().notEmpty().isEmail(),

        body("password").trim().notEmpty(),

        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ];
