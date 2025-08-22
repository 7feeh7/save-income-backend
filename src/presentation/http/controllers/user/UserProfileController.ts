import { Request, Response } from "express"
import { UserProfileUseCase } from "../../../../domain/useCase/user/UserProfile/UserProfileUseCase"

export class UserProfileController {
  constructor(private userProfileUseCase: UserProfileUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const userProfile = await this.userProfileUseCase.execute(id)

    return response.json(userProfile)
  }
}
