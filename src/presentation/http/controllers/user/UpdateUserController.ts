import { Request, Response } from "express"
import { HttpStatus } from "@/shared/http/HttpStatus"
import { UpdateUserUseCase } from "@/domain/useCase/user/UpdateUser/UpdateUserUseCase"

export class CreateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { name, email, phone, role_id } = request.body

    await this.updateUserUseCase.execute({ id, name, email, phone, role_id })

    return response.status(HttpStatus.OK).send()
  }
}
