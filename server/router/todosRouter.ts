import { Router } from "express";
import TodoController from "../controllers/TodosController";

const todosRouter = Router()

todosRouter.get('/', TodoController.get)
todosRouter.post('/', TodoController.create)

export default todosRouter