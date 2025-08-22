import { PostgresUserRepository } from "@/infra/db/sequelize/repositories/PostgresUsersRepository"
import { DeleteUserController } from "../../../../presentation/http/controllers/user/DeleteUserController"
import { DeleteUserUseCase } from "./DeleteUserUseCase"

const postgresUserRepository = new PostgresUserRepository()

const deleteUserUseCase = new DeleteUserUseCase(postgresUserRepository)

const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserUseCase, deleteUserController }
