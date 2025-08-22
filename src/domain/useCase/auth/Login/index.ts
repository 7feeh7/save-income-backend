import { PostgresUserRepository } from "@/infra/db/sequelize/repositories/PostgresUsersRepository"
import { LoginController } from "../../../../presentation/http/controllers/auth/LoginController"
import { LoginUseCase } from "./LoginUseCase"
import { BcryptPasswordHasherProvider } from "@/infra/providers/implementations/BcryptPasswordHasherProvider"

const postgresUserRepository = new PostgresUserRepository()

const bcryptPasswordHasherProvider = new BcryptPasswordHasherProvider()

const loginUseCase = new LoginUseCase(postgresUserRepository, bcryptPasswordHasherProvider)

const loginController = new LoginController(loginUseCase)

export { loginUseCase, loginController }
