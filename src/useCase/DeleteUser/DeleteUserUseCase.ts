import { IUsersRepository } from "@/repositories/IUsersRepository"
import { IDeleteUserRequestDTO } from "./DeleteUserDTO"
import { NotFoundException } from "@/shared/exceptions/NotFoundException"

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute(data: IDeleteUserRequestDTO) {
    const user = await this.usersRepository.findById(data.id)

    if (!user) {
      throw new NotFoundException("User not found.")
    }

    await this.usersRepository.delete(data.id)
  }
}
