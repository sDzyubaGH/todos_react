import { Router } from "express";
import TodoController from "../controllers/TodosController";
import subtasksRouter from "./subtasksRouter";
import authMiddleware from "../middlewares/authMiddleware";

const todosRouter = Router()

todosRouter.get('/:id', TodoController.get)
todosRouter.post('/', authMiddleware, TodoController.create)
todosRouter.delete('/:id', TodoController.delete)

todosRouter.use('/:todoId/subtasks', subtasksRouter)

export default todosRouter