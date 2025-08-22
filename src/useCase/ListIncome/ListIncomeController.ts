import { Request, Response } from "express"
import { ListIncomeUseCase } from "./ListIncomeUseCase"
import { IUser } from "./ListIncomeDTO"

export class ListIncomeController {
  constructor(private listIncomeUseCase: ListIncomeUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = new IUser(request.headers.userLoggerIn)
    const incomes = await this.listIncomeUseCase.execute(id)
    return response.json(incomes)
  }
}
