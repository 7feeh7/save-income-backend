import { PostgresUserRepository } from "@/infra/db/sequelize/repositories/PostgresUsersRepository"
import { CreateUserController } from "../../../../presentation/http/controllers/user/UpdateUserController"
import { UpdateUserUseCase } from "./UpdateUserUseCase"

const postgresUserRepository = new PostgresUserRepository()

const updateUserUseCase = new UpdateUserUseCase(postgresUserRepository)

const updateUserController = new CreateUserController(updateUserUseCase)

export { updateUserUseCase, updateUserController }
