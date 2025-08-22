import { Request, Response } from "express"
import { HttpStatus } from "@/shared/http/HttpStatus"
import { CreateExpenseUseCase } from "@/domain/useCase/expense/CreateExpense/CreateExpenseUseCase"

export class CreateExpenseController {
  constructor(private createExpenseUseCase: CreateExpenseUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, categoryId, description, amount, isFixed } = request.body

    await this.createExpenseUseCase.execute({
      userId,
      categoryId,
      description,
      amount,
      isFixed
    })

    return response.status(HttpStatus.NO_CONTENT).send()
  }
}
