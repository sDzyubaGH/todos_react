import { Router } from "express";
import TodosController from "../controllers/TodosController";

const subtasksRouter = Router()

subtasksRouter.get('/:id', TodosController.getSubtasks)
subtasksRouter.post('/')
subtasksRouter.delete('/')

export default subtasksRouter