import { Request, Response } from "express"
import { CreateUserUseCase } from "../../../../domain/useCase/user/CreateUser/CreateUserUseCase"
import { HttpStatus } from "@/shared/http/HttpStatus"

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, password, role_id } = request.body

    await this.createUserUseCase.execute({ name, email, phone, password, role_id })

    return response.status(HttpStatus.NO_CONTENT).send()
  }
}
