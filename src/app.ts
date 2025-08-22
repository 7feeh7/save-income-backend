import 'express-async-errors'
import express from "express"
import { router } from './presentation/http/routes'
import { errorHandler } from './presentation/http/middlewares/errorHandler'

const app = express()

app.use(express.json())
app.use(router)
app.use(errorHandler)

export { app }
