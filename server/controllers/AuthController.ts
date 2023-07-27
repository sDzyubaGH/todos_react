import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import { hash, compare } from 'bcryptjs'
import { prisma } from "../db";
import { UNIQUE_CONSTRAINT_FAILED_CODE } from "../prisma/errorCodes";
import User from "../types/User";
import { validationResult } from "express-validator/src/validation-result";
import 'dotenv/config'
import { SignOptions, sign } from "jsonwebtoken";
import roles from "../roles";
import getSecretFromProcessEnv from "../helpers/getSecretFromProcessEnv";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      const { username, password }: User = req.body

      const pwdHash = await hash(password, 8)
      const user = await prisma.user.create({ data: { username, password: pwdHash } })

      res.status(200).send(user)
    } catch (error: any) {
      if (error.code === UNIQUE_CONSTRAINT_FAILED_CODE) {
        return res.status(403).json({ message: 'Пользователь с таким именем уже есть' })
      }
      next(ApiError.internal(error.message))
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg })
      }

      const { username, password }: User = req.body

      const user = await prisma.user.findUnique({ where: { username } })
      if (!user) {
        return res.status(400).json({ message: `Пользователь с именем ${username} не найден` })
      }

      const isPwdValid = await compare(password, user.password)
      if (!isPwdValid) {
        return res.status(400).json({ message: 'Неверный пароль' })
      }

      const token = generateAccessToken(user.id, [roles.admin, roles.user])

      return res.status(200).json(token)
    } catch (error: any) {
      next(ApiError.internal(error.message))
    }
  }
}

function generateAccessToken(id: number, roles: string[]) {
  const payload = {
    id,
    roles
  }

  const options: SignOptions = {
    expiresIn: '24h'
  }

  const secret = getSecretFromProcessEnv()

  return sign(payload, secret, options)
}

export default new AuthController()