import { MailtrapMailProvider } from "@/providers/implementations/MailtrapMailProvider"
import { PostgresUserRepository } from "@/repositories/implementations/PostgresUsersRepository"
import { CreateUserController } from "./CreateUserController"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { BcryptPasswordHasherProvider } from "@/providers/implementations/BcryptPasswordHasherProvider"

const postgresUserRepository = new PostgresUserRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const bcryptPasswordHasherProvider = new BcryptPasswordHasherProvider()

const createUserUseCase = new CreateUserUseCase(
  postgresUserRepository,
  mailtrapMailProvider,
  bcryptPasswordHasherProvider
)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
