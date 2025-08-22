import { Expense } from "@/domain/entities/Expense"

export interface IExpenseRepository {
  save(expense: Expense): Promise<void>
  getExpenseByUser(userId: string, page: number, limit: number): Promise<any>
}
