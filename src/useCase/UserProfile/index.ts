import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository"
import { UserProfileController } from "./UserProfileController"
import { UserProfileUseCase } from "./UserProfileUseCase"

const postgresUserRepository = new PostgresUserRepository()

const userProfileUseCase = new UserProfileUseCase(postgresUserRepository)

const userProfileController = new UserProfileController(userProfileUseCase)

export { userProfileUseCase, userProfileController }
