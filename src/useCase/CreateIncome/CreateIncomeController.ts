import { Request, Response } from "express"
import { CreateIncomeUseCase } from "./CreateIncomeUseCase"
import { HttpStatus } from "@/shared/http/HttpStatus"

export class CreateIncomeController {
  constructor(private createIncomeUseCase: CreateIncomeUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, description, amount } = request.body

    await this.createIncomeUseCase.execute({ userId, description, amount })

    return response.status(HttpStatus.NO_CONTENT).send()
  }
}
