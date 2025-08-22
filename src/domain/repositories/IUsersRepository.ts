import { User } from "@/domain/entities/User"

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>
  save(user: User): Promise<void>
  userProfile(id: string): Promise<User>
  refreshToken(id: unknown, token: string, lastAcess: Date): Promise<void>
  existUserWithToken(id: string, token: string): Promise<User>
  findById(id: string): Promise<User>
  update(user: any): Promise<void>
  delete(id: string): Promise<void>
}
