import { Expense } from "@/entities/Expense"
import { IExpenseRepository } from "@/repositories/IExpenseRepository"

interface ListExpenseDTO {
  id: string;
  page: number;
  limit: number;
}

export class ListExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) { }

  async execute({ id, page, limit }: ListExpenseDTO): Promise<Expense> {
    return await this.expenseRepository.getExpenseByUser(id, page, limit)
  }
}
