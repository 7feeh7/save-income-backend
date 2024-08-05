import { Expense } from "../entities/Expense"

export interface IExpenseRepository {
  save(expense: Expense): Promise<void>
  getExpenseByUser(userId: string): Promise<any>
}
