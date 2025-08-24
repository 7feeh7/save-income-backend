import { Request, Response } from "express"
import { parseQueryParamToNumber } from "@/shared/utils/parseQueryParamToNumber"
import { IUser } from "@/domain/useCase/expense/ListExpense/ListExpenseDTO"
import { ListExpenseUseCase } from "@/domain/useCase/expense/ListExpense/ListExpenseUseCase"

export class ListExpenseController {
  constructor(private listExpenseUseCase: ListExpenseUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = new IUser(request.headers.userLoggerIn)

    const { page, limit } = request.query

    const expenses = await this.listExpenseUseCase.execute({
      id,
      page: parseQueryParamToNumber(page),
      limit: parseQueryParamToNumber(limit)
    })
    return response.json(expenses)
  }
}
