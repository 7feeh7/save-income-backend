import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class UserProfileUseCase {
    constructor(
        private usersRepository: IUsersRepository,
    ) {}

    async execute(id: string): Promise<User> {
        return await this.usersRepository.userProfile(id);
    }
}