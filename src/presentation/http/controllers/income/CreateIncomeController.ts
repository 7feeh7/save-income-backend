import { Request, Response } from "express"
import { HttpStatus } from "@/shared/http/HttpStatus"
import { CreateIncomeUseCase } from "@/domain/useCase/income/CreateIncome/CreateIncomeUseCase"

export class CreateIncomeController {
  constructor(private createIncomeUseCase: CreateIncomeUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, description, amount } = request.body

    await this.createIncomeUseCase.execute({ userId, description, amount })

    return response.status(HttpStatus.NO_CONTENT).send()
  }
}
