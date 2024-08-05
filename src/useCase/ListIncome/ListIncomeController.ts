import { Request, Response } from "express"
import { ListIncomeUseCase } from "./ListIncomeUseCase"
import { IUser } from "./ListIncomeDTO"

export class ListIncomeController {
  constructor(private listIncomeUseCase: ListIncomeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = new IUser(request.headers.userLoggerIn)

    try {
      const incomes = await this.listIncomeUseCase.execute(id)
      return response.json(incomes)
    } catch (err: unknown) {
      return response.status(500).json({
        message: (err as Error).message || "Unexpected error.",
      })
    }
  }
}
