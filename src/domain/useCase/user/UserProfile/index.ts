import { PostgresUserRepository } from "@/infra/db/sequelize/repositories/PostgresUsersRepository"
import { UserProfileController } from "../../../../presentation/http/controllers/user/UserProfileController"
import { UserProfileUseCase } from "./UserProfileUseCase"

const postgresUserRepository = new PostgresUserRepository()

const userProfileUseCase = new UserProfileUseCase(postgresUserRepository)

const userProfileController = new UserProfileController(userProfileUseCase)

export { userProfileUseCase, userProfileController }
