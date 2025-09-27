import { GetTotalExpenseUseCase } from "@/domain/useCase/expense/GetTotalExpense/GetTotalExpenseUseCase"
import { IUser } from "@/domain/useCase/expense/ListExpense/ListExpenseDTO"
import { Request, Response } from "express"

export class GetTotalExpenseController {
  constructor(private getTotalExpenseUseCase: GetTotalExpenseUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = new IUser(request.headers.userLoggerIn)

    const { startDate, endDate } = request.query

    const sum = await this.getTotalExpenseUseCase.execute({
      id,
      startDate: new Date(startDate as string),
      endDate: new Date(endDate as string)
    })

    return response.json({ total: sum })
  }
}
