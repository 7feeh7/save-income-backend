import { Router } from "express"
import { adaptMiddleware } from "@/presentation/http/adapters/ExpressMiddlewareAdapter"
import { createExpenseController } from "@/domain/useCase/expense/CreateExpense"
import { listExpenseController } from "@/domain/useCase/expense/ListExpense"
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware"
import { validateBody } from "../middlewares/validation.middleware"
import { createExpenseSchema } from "../validators/expense/createExpense.schema"

const expenseRouter = Router()

expenseRouter.use(adaptMiddleware(makeAuthMiddleware()))

expenseRouter.post(
  "/",
  validateBody(createExpenseSchema),
  (request, response) => {
    return createExpenseController.handle(request, response)
  },
)

expenseRouter.get("/", (request, response) => {
  return listExpenseController.handle(request, response)
})

export { expenseRouter }
