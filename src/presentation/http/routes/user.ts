import { Router } from "express"
import { adaptMiddleware } from "@/presentation/http/adapters/ExpressMiddlewareAdapter"
import { createUserController } from "@/domain/useCase/user/CreateUser"
import { userProfileController } from "@/domain/useCase/user/UserProfile"
import { updateUserController } from "@/domain/useCase/user/UpdateUser"
import { deleteUserController } from "@/domain/useCase/user/DeleteUser"
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware"

const userRouter = Router()
const userAuthenticatedRouter = Router()

userAuthenticatedRouter.use(adaptMiddleware(makeAuthMiddleware()))

userRouter.post("/", (request, response) => {
  return createUserController.handle(request, response)
})

userAuthenticatedRouter.get("/:id", (request, response) => {
  return userProfileController.handle(request, response)
})

userAuthenticatedRouter.patch("/:id", (request, response) => {
  return updateUserController.handle(request, response)
})

userAuthenticatedRouter.delete("/:id", (request, response) => {
  return deleteUserController.handle(request, response)
})

export { userRouter, userAuthenticatedRouter }
