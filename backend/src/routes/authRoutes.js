import { Router } from "express"
import {login, register} from "../controllers/authController.js"
import { authLimit } from "../middlewares/user/rateLimitMiddleware.js"
import { validateRegister } from "../middlewares/user/registerValidationMiddleware.js"
import { validateLogin } from "../middlewares/user/loginValidationMiddleware.js"

const router = Router()

router.post("/register", validateRegister, authLimit, register)
router.post("/login",validateLogin, authLimit, login)

export default router