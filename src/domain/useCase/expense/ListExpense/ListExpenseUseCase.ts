import { IExpenseRepository } from "@/domain/repositories/IExpenseRepository"
import { ExpenseListResult, ListExpenseDTO } from "./ListExpenseDTO"

export class ListExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) { }

  async execute(params: ListExpenseDTO): Promise<ExpenseListResult> {
    return await this.expenseRepository.getExpenseByUser(params)
  }
}
