import { Router } from "express"
import { adaptMiddleware } from "@/adapters/ExpressMiddlewareAdapter"
import { makeAuthMiddleware } from "@/middlewares/AuthMiddleware"
import { createUserController } from "@/useCase/CreateUser"
import { userProfileController } from "@/useCase/UserProfile"
import { updateUserController } from "@/useCase/UpdateUser"
import { deleteUserController } from "@/useCase/DeleteUser"

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
