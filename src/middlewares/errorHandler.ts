import { AppError } from "@/shared/exceptions/AppError"
import { NextFunction, Request, Response } from "express"

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        })
    }

    console.error("[UNHANDLED ERROR]", err)

    return res.status(500).json({
        message: "Internal Server Error",
    })
}
