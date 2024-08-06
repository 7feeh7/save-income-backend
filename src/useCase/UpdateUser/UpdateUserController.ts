import { Request, Response } from "express"
import { UpdateUserUseCase } from "./UpdateUserUseCase"

export class CreateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, phone, role_id } = request.body

    try {
      await this.updateUserUseCase.execute({
        id,
        name,
        email,
        phone,
        role_id,
      })

      return response.status(201).send()
    } catch (err: unknown) {
      return response.status(400).json({
        message: (err as Error).message || "Unexpected error.",
      })
    }
  }
}
