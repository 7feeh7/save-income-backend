import { IUser } from "@/domain/useCase/expense/ListExpense/ListExpenseDTO"
import { ListIncomeUseCase } from "@/domain/useCase/income/ListIncome/ListIncomeUseCase"
import { parseQueryParamToNumber } from "@/shared/utils/parseQueryParamToNumber"
import { Request, Response } from "express"

export class ListIncomeController {
  constructor(private listIncomeUseCase: ListIncomeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = new IUser(request.headers.userLoggerIn)

    const { page, limit } = request.query

    const incomes = await this.listIncomeUseCase.execute({
      id,
      page: parseQueryParamToNumber(page),
      limit: parseQueryParamToNumber(limit),
    })
    return response.json(incomes)
  }
}
