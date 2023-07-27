import { Router } from "express";
import todosRouter from "./todosRouter";
import authRouter from "./authRouter";

const indexRouter = Router()

indexRouter.use('/todos', todosRouter)
indexRouter.use('/auth', authRouter)

export default indexRouter