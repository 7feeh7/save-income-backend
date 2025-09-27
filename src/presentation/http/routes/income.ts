import { Router } from "express"
import { adaptMiddleware } from "@/presentation/http/adapters/ExpressMiddlewareAdapter"
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware"
import { createIncomeController } from "@/domain/useCase/income/CreateIncome"
import { listIncomeController } from "@/domain/useCase/income/ListIncome"
import { validateBody } from "../middlewares/validation.middleware"
import { createIncomeSchema } from "../validators/income/createIncome.schema"

const incomeRouter = Router()

incomeRouter.use(adaptMiddleware(makeAuthMiddleware()))

incomeRouter.post(
  "/",
  validateBody(createIncomeSchema),
  (request, response) => {
    return createIncomeController.handle(request, response)
  },
)

incomeRouter.get("/", (request, response) => {
  return listIncomeController.handle(request, response)
})

export { incomeRouter }
