import { PostgresUserRepository } from "@/repositories/implementations/PostgresUsersRepository"
import { LoginController } from "./LoginController"
import { LoginUseCase } from "./LoginUseCase"

const postgresUserRepository = new PostgresUserRepository()

const loginUseCase = new LoginUseCase(postgresUserRepository)

const loginController = new LoginController(loginUseCase)

export { loginUseCase, loginController }
