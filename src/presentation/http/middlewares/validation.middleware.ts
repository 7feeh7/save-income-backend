import { HttpStatus } from "@/shared/http/HttpStatus"
import { Request, Response, NextFunction } from "express"
import { ZodError, ZodObject, z } from "zod"

export const validate = (schema: ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }))

        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          errors,
        })
      }

      next(err)
    }
  }
}

export const validateBody = (schema: ZodObject<any>) => {
  return validate(z.object({ body: schema }))
}

export const validateQuery = (schema: ZodObject<any>) => {
  return validate(z.object({ query: schema }))
}

export const validateParams = (schema: ZodObject<any>) => {
  return validate(z.object({ params: schema }))
}
