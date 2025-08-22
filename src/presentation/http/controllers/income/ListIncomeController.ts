import { IUser } from "@/domain/useCase/expense/ListExpense/ListExpenseDTO"
import { ListIncomeUseCase } from "@/domain/useCase/income/ListIncome/ListIncomeUseCase"
import { Request, Response } from "express"

export class ListIncomeController {
  constructor(private listIncomeUseCase: ListIncomeUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = new IUser(request.headers.userLoggerIn)
    const incomes = await this.listIncomeUseCase.execute(id)
    return response.json(incomes)
  }
}
