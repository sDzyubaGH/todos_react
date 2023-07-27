import { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'
import { prisma } from '../db'

class UserControler {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params
      const user = await prisma.user.findUnique({ where: { username } })
      res.status(200).json(user)
    } catch (error: any) {
      console.log(error)
      next(ApiError.internal(error.message))
    }
  }
}

export default new UserControler()