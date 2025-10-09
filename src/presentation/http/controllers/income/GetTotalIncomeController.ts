import { IUser } from "@/domain/useCase/expense/ListExpense/ListExpenseDTO"
import { GetTotalIncomeUseCase } from "@/domain/useCase/income/GetTotalIncome/GetTotalIncomeUseCase"
import { Request, Response } from "express"

export class GetTotalIncomeController {
  constructor(private getTotalIncomeUseCase: GetTotalIncomeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = new IUser(request.headers.userLoggerIn)

    const { startDate, endDate } = request.query

    const sum = await this.getTotalIncomeUseCase.execute({
      id,
      startDate: new Date(startDate as string),
      endDate: new Date(endDate as string),
    })

    return response.json({ total: sum })
  }
}
