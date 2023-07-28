import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import getSecretFromProcessEnv from "../helpers/getSecretFromProcessEnv"
import IUserRequest from "../types/UserRequest"

interface JwtPayload {
  roles: string[]
}

export default function (roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      return next()
    }
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
      }

      const secret = getSecretFromProcessEnv()

      const decodedjwt = verify(token, secret) as JwtPayload;
      // (req as IUserRequest).token = decodedjwt

      let hasPermission = false

      const { roles: userRoles } = decodedjwt
      for (const userRole of userRoles) {
        if (roles.includes(userRole)) {
          hasPermission = true
        }
      }

      if (!hasPermission) {
        return res.status(403).json({ message: "Нет доступа" })
      }

      next()
    } catch (error: any) {
      res.status(401).json({ message: "Не авторизован" })
    }
  }
}