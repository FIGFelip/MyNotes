import rateLimit from "express-rate-limit";

export const authLimit =
  process.env.NODE_ENV === "test"
    ? (req, res, next) => next()
    : rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 8,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
          message: "Muitas tentativas, tente novamente mais tarde",
        },
      });
