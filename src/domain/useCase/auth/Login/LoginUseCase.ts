import { auth } from "@/config/auth"
import { User } from "@/domain/entities/User"
import { IUsersRepository } from "@/domain/repositories/IUsersRepository"
import { ILoginRequestDTO } from "./LoginDTO"
import jwt from "jsonwebtoken"
import { UnauthorizedException } from "@/shared/exceptions/UnauthorizedException"
import { IPasswordHasher } from "@/infra/providers/IPasswordHasher"

export class LoginUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hasher: IPasswordHasher,
  ) { }

  async execute(data: ILoginRequestDTO) {
    const { email, password } = data

    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new UnauthorizedException("Invalid email or password.")


    await this.validatePassword(password, user.password)

    return await this.setToken(user)
  }

  private async validatePassword(password: string, dbhash: string) {
    const isValidPassword = await this.hasher.compare(password, dbhash)

    if (!isValidPassword) throw new UnauthorizedException("Invalid email or password.")
  }

  private async setToken(user: User) {
    const token = jwt.sign({ id: user.id }, auth.secretKey, {
      expiresIn: auth.expiresIn,
    })
    await this.usersRepository.refreshToken(user.id, token, new Date())
    return token
  }
}
