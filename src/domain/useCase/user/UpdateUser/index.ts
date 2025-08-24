import { PostgresUserRepository } from "@/infra/db/sequelize/repositories/PostgresUsersRepository"
import { UpdateUserUseCase } from "./UpdateUserUseCase"
import { UpdateUserController } from "@/presentation/http/controllers/user/UpdateUserController"

const postgresUserRepository = new PostgresUserRepository()

const updateUserUseCase = new UpdateUserUseCase(postgresUserRepository)

const updateUserController = new UpdateUserController(updateUserUseCase)

export { updateUserUseCase, updateUserController }
