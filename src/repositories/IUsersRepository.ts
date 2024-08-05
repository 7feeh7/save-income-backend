import { User } from "../entities/User"

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>
  save(user: User): Promise<void>
  userProfile(id: string): Promise<User>
  refreshToken(id: unknown, token: string, lastAcess: Date): Promise<void>
  existUserWithToken(id: string, token: string): Promise<User>
}
