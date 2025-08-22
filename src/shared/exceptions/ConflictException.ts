import { HttpStatus } from "../http/HttpStatus"
import { AppError } from "./AppError"

export class ConflictException extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.CONFLICT)
    }
}
