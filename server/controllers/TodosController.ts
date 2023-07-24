import { NextFunction, Request, Response } from "express";
import { prisma } from "../db";
import ApiError from "../error/ApiError";
import type Todo from '../../types/Todo'

class TodoController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await prisma.todo.findMany()
      return res.status(200).json(todos)
    } catch (error: any) {
      next(ApiError.internal(error.message))
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, priority }: Todo = req.body
      const newTodo = await prisma.todo.create({ data: { title, priority } })
      return res.status(200).json(newTodo)
    } catch (error: any) {
      next(ApiError.internal(error.message))
    }
  }
}

export default new TodoController