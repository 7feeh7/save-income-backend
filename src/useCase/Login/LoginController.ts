import { Request, Response } from "express"
import { LoginUseCase } from "./LoginUseCase"

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    try {
      const data = await this.loginUseCase.execute({ email, password })

      return response.status(200).json({ token: data })
    } catch (err: unknown) {
      return response.status(400).json({
        message: "Invalid email or password.",
      })
    }
  }
}
