import { DeleteUserUseCase } from "@/domain/useCase/user/DeleteUser/DeleteUserUseCase"
import { HttpStatus } from "@/shared/http/HttpStatus"
import { Request, Response } from "express"

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    await this.deleteUserUseCase.execute({ id })

    return response.status(HttpStatus.NO_CONTENT).send()
  }
}
