import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { check } from "express-validator";

const authRouter = Router()

authRouter.post('/registration', [
  check('username', 'Имя пользователя не может быть пустым').trim().notEmpty(),
  check('password', 'Пароль не может быть меньше 4-х символов').trim().isLength({ min: 4 })
], AuthController.registration)

authRouter.post('/login', [
  check('username', 'Имя пользователя не может быть пустым').trim().notEmpty(),
  check('password', 'Имя пользователя не может быть пустым').trim().notEmpty(),
  
], AuthController.login)

export default authRouter