import { PostgresUserRepository } from "@/repositories/implementations/PostgresUsersRepository"
import { CreateUserController } from "./UpdateUserController"
import { UpdateUserUseCase } from "./UpdateUserUseCase"

const postgresUserRepository = new PostgresUserRepository()

const updateUserUseCase = new UpdateUserUseCase(postgresUserRepository)

const updateUserController = new CreateUserController(updateUserUseCase)

export { updateUserUseCase, updateUserController }
