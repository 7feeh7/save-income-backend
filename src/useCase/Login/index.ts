import { PostgresUserRepository } from "@/repositories/implementations/PostgresUsersRepository"
import { LoginController } from "./LoginController"
import { LoginUseCase } from "./LoginUseCase"
import { BcryptPasswordHasherProvider } from "@/providers/implementations/BcryptPasswordHasherProvider"

const postgresUserRepository = new PostgresUserRepository()

const bcryptPasswordHasherProvider = new BcryptPasswordHasherProvider()

const loginUseCase = new LoginUseCase(postgresUserRepository, bcryptPasswordHasherProvider)

const loginController = new LoginController(loginUseCase)

export { loginUseCase, loginController }
