import { Request, Response } from "express"
import { parseQueryParamToNumber } from "@/shared/utils/parseQueryParamToNumber"
import { IUser } from "@/domain/useCase/expense/ListExpense/ListExpenseDTO"
import { ListExpenseUseCase } from "@/domain/useCase/expense/ListExpense/ListExpenseUseCase"

export class ListExpenseController {
  constructor(private listExpenseUseCase: ListExpenseUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = new IUser(request.headers.userLoggerIn)

    const { page, limit, order, orderDirection, categoryId, isFixed } = request.query

    const expenses = await this.listExpenseUseCase.execute({
      id,
      page: parseQueryParamToNumber(page),
      pageSize: parseQueryParamToNumber(limit),
      order: String(order),
      orderDirection: String(orderDirection),
      categoryId: Number(categoryId), 
      isFixed: Boolean(isFixed)
    })
    return response.json(expenses)
  }
}
