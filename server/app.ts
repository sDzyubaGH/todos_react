import express, { Express, Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import indexRouter from './router'
import bodyParser from 'body-parser'

const { PORT } = process.env

const app: Express = express()

app.use(bodyParser.json())

app.use('/api', indexRouter)

app.listen(PORT, () => {
  console.log('App started at port', PORT)
})