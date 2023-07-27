import { NextFunction, Request, Response } from "express";
import { prisma } from "../db";
import ApiError from "../error/ApiError";
import type Todo from '../types/Todo'

class TodoController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      let todos;
      if (id) {
        todos = await prisma.todo.findUnique({ where: { id: parseInt(id) } })
      } else {
        todos = await prisma.todo.findMany()
      }
      return res.status(200).json(todos)
    } catch (error: any) {
      next(ApiError.internal(error.message))
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, priority }: Todo = req.body
      if (!title) {
        return res.status(404).json({ message: 'Название задачи не заполнено' })
      }
      const newTodo = await prisma.todo.create({ data: { title, priority, description } })
      return res.status(200).json(newTodo)
    } catch (error: any) {
      next(ApiError.internal(error.message))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      const deletedTodo = await prisma.todo.delete({ where: { id } })
      return res.status(200).json(deletedTodo)
    } catch (error: any) {
      next(ApiError.internal(error.message))
    }
  }

  async getSubtasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { todoId } = req.params
      // const deletedTodo = await prisma.subtask.findMany({ where: { todoId } })
      return res.status(200).json({ message: 'result' })
    } catch (error: any) {
      next(ApiError.internal(error.message))
    }
  }
}

export default new TodoController