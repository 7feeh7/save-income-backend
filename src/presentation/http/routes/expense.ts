import { Router } from "express"
import { adaptMiddleware } from "@/presentation/http/adapters/ExpressMiddlewareAdapter"
import { createExpenseController } from "@/domain/useCase/expense/CreateExpense"
import { listExpenseController } from "@/domain/useCase/expense/ListExpense"
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware"

const expenseRouter = Router()

expenseRouter.use(adaptMiddleware(makeAuthMiddleware()))

expenseRouter.post("/", (request, response) => {
  return createExpenseController.handle(request, response)
})

expenseRouter.get("/", (request, response) => {
  return listExpenseController.handle(request, response)
})

export { expenseRouter }
