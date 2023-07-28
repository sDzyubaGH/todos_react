import { Router } from "express";
import TodoController from "../controllers/TodosController";
import subtasksRouter from "./subtasksRouter";
import authMiddleware from "../middlewares/authMiddleware";
import rolesMiddleware from "../middlewares/rolesMiddleware";

const todosRouter = Router()

todosRouter.get('/:id', TodoController.get)
todosRouter.post('/', authMiddleware, rolesMiddleware(['ADMIN']), TodoController.create)
todosRouter.delete('/:id', TodoController.delete)

todosRouter.use('/:todoId/subtasks', subtasksRouter)

export default todosRouter