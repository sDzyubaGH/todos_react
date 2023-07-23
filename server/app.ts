import express, { Express, Request, Response, NextFunction } from 'express'
import 'dotenv/config'

const { PORT } = process.env

const app: Express = express()

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Express + TypeScript Server');
})

app.listen(PORT, () => {
  console.log('App started at port', PORT)
})