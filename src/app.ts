import "express-async-errors"
import express from "express"
import cors from "cors"
import { router } from "./presentation/http/routes"
import { errorHandler } from "./presentation/http/middlewares/error.handler"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorHandler)

export { app }
