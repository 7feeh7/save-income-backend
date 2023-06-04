import { User } from "../entities/User";

export interface IUsersRepository {
    findByEmail(email: string): Promise<User>
    save(user: User): Promise<void>
    userProfile(id: string): Promise<User>
    refreshToken(token: string, lastAcess: string): Promise<void>
}