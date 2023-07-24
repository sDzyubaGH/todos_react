import { Router } from "express";
import todosRouter from "./todosRouter";

const indexRouter = Router()

indexRouter.use('/todos', todosRouter)

export default indexRouter