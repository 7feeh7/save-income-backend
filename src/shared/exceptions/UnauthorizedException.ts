import { HttpStatus } from "../http/HttpStatus"
import { AppError } from "./AppError"

export class UnauthorizedException extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.UNAUTHORIZED)
    }
}
