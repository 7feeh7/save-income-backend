import { Router } from "express"
import { adaptMiddleware } from "@/adapters/ExpressMiddlewareAdapter"
import { makeAuthMiddleware } from "@/middlewares/AuthMiddleware"
import { createExpenseController } from "@/useCase/CreateExpense"
import { listExpenseController } from "@/useCase/ListExpense"

const expenseRouter = Router()

expenseRouter.use(adaptMiddleware(makeAuthMiddleware()))

expenseRouter.post("/", (request, response) => {
  return createExpenseController.handle(request, response)
})

expenseRouter.get("/", (request, response) => {
  return listExpenseController.handle(request, response)
})

export { expenseRouter }
