import { Request, Response } from "express"
import { LoginUseCase } from "./LoginUseCase"
import { HttpStatus } from "@/shared/http/HttpStatus"

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const data = await this.loginUseCase.execute({ email, password })

    return response.status(HttpStatus.OK).json({ token: data })
  }
}
