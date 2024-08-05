import { Request, Response } from "express"
import { User } from "../../entities/User"
import { UserProfileUseCase } from "./UserProfileUseCase"

export class UserProfileController {
  constructor(private userProfileUseCase: UserProfileUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    try {
      const userProfile = await this.userProfileUseCase.execute(id)
      return response.json(userProfile)
    } catch (err: unknown) {
      return response.status(500).json({
        message: (err as Error).message || "Unexpected error.",
      })
    }
  }
}
