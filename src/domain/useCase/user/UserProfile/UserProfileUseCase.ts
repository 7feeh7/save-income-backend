import { User } from "@/domain/entities/User"
import { IUsersRepository } from "@/domain/repositories/IUsersRepository"

export class UserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute(id: string): Promise<User> {
    return await this.usersRepository.userProfile(id)
  }
}
