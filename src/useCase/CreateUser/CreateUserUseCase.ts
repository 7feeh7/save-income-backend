import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import bcrypt from 'bcrypt';
import { bcryptSettings } from "../../config/auth";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error('User already exists.');
        }

        const hashedPassword = await bcrypt.hash(data.password, bcryptSettings.salts);

        const user = new User(
            data.name,
            data.email,
            data.phone,
            hashedPassword,
            data.role_id
        );

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe Money App',
                email: 'felipe.pires.soaresti@gmail.com'
            },
            subject: 'Seja bem-vindo a plataforma',
            body: '<p>Você ja pode fazer login em nossa plataforma.</p>'
        });
    }
}