import { Expense } from "@/entities/Expense"
import { IExpenseRepository } from "@/repositories/IExpenseRepository"
import { formatCurrencyForPostgres } from "@/utils/currency"
import { ICreateExpenseRequestDTO } from "./CreateExpenseDTO"

export class CreateExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) { }

  async execute(data: ICreateExpenseRequestDTO) {
    const expense = new Expense(
      data.userId,
      data.categoryId,
      data.description,
      Number(formatCurrencyForPostgres(data.amount)),
    )

    await this.expenseRepository.save(expense)
  }
}
