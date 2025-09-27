import { Router } from "express"
import { adaptMiddleware } from "@/presentation/http/adapters/ExpressMiddlewareAdapter"
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware"
import { listCategoryController } from "@/domain/useCase/category/ListCategory"

const categoryRouter = Router()

categoryRouter.use(adaptMiddleware(makeAuthMiddleware()))


categoryRouter.get("/", (request, response) => {
  return listCategoryController.handle(request, response)
})

export { categoryRouter }
