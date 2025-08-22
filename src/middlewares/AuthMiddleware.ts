import { Request } from "express"
import jwt from "jsonwebtoken"
import { auth } from "../config/auth"
import { PostgresUserRepository } from "@/repositories/implementations/PostgresUsersRepository"
import { IUsersRepository } from "@/repositories/IUsersRepository"
import { HttpStatus } from "@/shared/http/HttpStatus"
import { UnauthorizedException } from "@/shared/exceptions/UnauthorizedException"

interface TokenPayload {
  id: string
  iat: number
  exp: number
}

export class AuthMiddleware {
  constructor(private usersRepository: IUsersRepository) { }
  async handle(request: Request) {
    const { authorization } = request.headers

    if (!authorization) {
      throw new UnauthorizedException("Access Denied.")
    }

    const token = authorization.replace("Bearer", "").trim()

    const data = jwt.verify(token, auth.secretKey)

    const { id } = data as TokenPayload

    const user = await this.usersRepository.existUserWithToken(id, token)

    if (!user) throw new UnauthorizedException("Access Denied.")

    return {
      statusCode: HttpStatus.OK,
      headers: { userLoggerIn: user },
    }
  }
}

export function makeAuthMiddleware(): AuthMiddleware {
  const postgresUserRepository = new PostgresUserRepository()
  const ensureAuthMiddleware = new AuthMiddleware(postgresUserRepository)
  return ensureAuthMiddleware
}
