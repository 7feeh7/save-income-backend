import { PostgresUserRepository } from "@/infra/db/sequelize/repositories/PostgresUsersRepository"
import { CreateUserController } from "../../../../presentation/http/controllers/user/CreateUserController"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { BcryptPasswordHasherProvider } from "@/infra/providers/implementations/BcryptPasswordHasherProvider"
import { MailtrapMailProvider } from "@/infra/providers/implementations/MailtrapMailProvider"

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
