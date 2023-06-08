import { auth } from "../../config/auth";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ILoginRequestDTO } from "./LoginDTO";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export class LoginUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) { }

    async execute(data: ILoginRequestDTO) {
        const user = await this.usersRepository.findByEmail(data.email);

        await this.validatePassword(data.password, user.password);

        return await this.setToken(user);
    }

    private async validatePassword(password: string, dbhash: string) {
        const isValidPassword = await bcrypt.compare(password, dbhash);

        if (!isValidPassword) throw new Error("Invalid email or password.");
    }

    private async setToken(user: User) {
        const token = jwt.sign({ id: user.id}, auth.secretKey, { expiresIn: auth.expiresIn });
        await this.usersRepository.refreshToken(user.id, token, new Date());
        return token;
    }
}