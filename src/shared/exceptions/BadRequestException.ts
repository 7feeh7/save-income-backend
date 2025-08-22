import { HttpStatus } from "../http/HttpStatus"
import { AppError } from "./AppError"

export class BadRequestException extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST)
    }
}
