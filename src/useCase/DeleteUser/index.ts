import { PostgresUserRepository } from "@/repositories/implementations/PostgresUsersRepository"
import { DeleteUserController } from "./DeleteUserController"
import { DeleteUserUseCase } from "./DeleteUserUseCase"

const postgresUserRepository = new PostgresUserRepository()

const deleteUserUseCase = new DeleteUserUseCase(postgresUserRepository)

const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserUseCase, deleteUserController }
