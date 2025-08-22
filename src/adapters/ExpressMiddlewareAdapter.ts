import { AuthMiddleware } from "@/middlewares/AuthMiddleware"
import { NextFunction, Request, Response } from "express"

export const adaptMiddleware = (middleware: AuthMiddleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const httpResponse = await middleware.handle(request)
      Object.assign(request, httpResponse)
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
