import { IUsersRepository } from "@/repositories/IUsersRepository"
import { IUpdateUserRequestDTO } from "./UpdateUserDTO"
import { NotFoundException } from "@/shared/exceptions/NotFoundException"

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute(data: IUpdateUserRequestDTO) {
    const user = await this.usersRepository.findById(data.id)

    if (!user) {
      throw new NotFoundException("User not found.")
    }

    await this.usersRepository.update(data)
  }
}
