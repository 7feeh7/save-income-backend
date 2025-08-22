import { HttpStatus } from "../http/HttpStatus"
import { AppError } from "./AppError"

export class NotFoundException extends AppError {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND)
    }
}
