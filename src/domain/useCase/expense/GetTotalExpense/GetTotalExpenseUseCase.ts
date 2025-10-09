import { GetTotalExpenseDTO } from "./GetTotalExpenseDTO"
import { IExpenseRepository } from "@/domain/repositories/IExpenseRepository"

export class GetTotalExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute({
    id,
    startDate,
    endDate,
  }: GetTotalExpenseDTO): Promise<number> {
    return await this.expenseRepository.getSumByPeriod({
      id,
      startDate,
      endDate,
    })
  }
}
