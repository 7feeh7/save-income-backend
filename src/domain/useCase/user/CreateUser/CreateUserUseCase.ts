import { IUsersRepository } from "@/domain/repositories/IUsersRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO"
import { User } from "@/domain/entities/User"
import { ConflictException } from "@/shared/exceptions/ConflictException"
import { IMailProvider } from "@/infra/providers/IMailProvider"
import { IPasswordHasher } from "@/infra/providers/IPasswordHasher"

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private hasher: IPasswordHasher,
  ) { }

  async execute(data: ICreateUserRequestDTO) {
    const { name, email, phone, password, role_id } = data

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new ConflictException("User already exists.")
    }

    const hashedPassword = await this.hasher.hash(password)

    const user = new User(name, email, phone, hashedPassword, role_id)

    await this.usersRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: name,
        email: email,
      },
      from: {
        name: "Equipe Money App",
        email: "felipe.pires.soaresti@gmail.com",
      },
      subject: "Seja bem-vindo a plataforma",
      body: "<p>Você ja pode fazer login em nossa plataforma.</p>",
    })
  }
}
