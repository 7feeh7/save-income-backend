import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ILoginRequestDTO } from "./LoginDTO";
import bcrypt from 'bcrypt';

export class LoginUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ){}

    async execute(data: ILoginRequestDTO) {
        const user = await this.usersRepository.findByEmail(data.email);

        const isValid = await bcrypt.compare(data.password, user.password);
        
        if (!isValid) throw new Error("Invalid email or password.");
    }
}