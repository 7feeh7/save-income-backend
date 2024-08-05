import { Request, Response } from "express"
import { ListExpenseUseCase } from "./ListExpenseUseCase"
import { IUser } from "./ListExpenseDTO"
import { parseQueryParamToNumber } from "@/utils/parseQueryParamToNumber"

export class ListExpenseController {
  constructor(private listExpenseUseCase: ListExpenseUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = new IUser(request.headers.userLoggerIn)

    const { page, limit } = request.query

    try {
      const expenses = await this.listExpenseUseCase.execute({
        id,
        page: parseQueryParamToNumber(page),
        limit: parseQueryParamToNumber(limit)
      })
      return response.json(expenses)
    } catch (err: unknown) {
      return response.status(500).json({
        message: (err as Error).message || "Unexpected error.",
      })
    }
  }
}
