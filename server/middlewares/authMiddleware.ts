import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import getSecretFromProcessEnv from "../helpers/getSecretFromProcessEnv"
import IUserRequest from "../types/UserRequest"

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }

    const secret = getSecretFromProcessEnv()

    const decodedjwt = verify(token, secret);
    (req as IUserRequest).token = decodedjwt

    next()
  } catch (error: any) {
    res.status(401).json({ message: "Не авторизован" })
  }
}