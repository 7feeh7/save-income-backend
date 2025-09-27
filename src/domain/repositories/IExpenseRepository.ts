import { Expense } from "@/domain/entities/Expense"
import { GetTotalExpenseDTO } from "../useCase/expense/GetTotalExpense/GetTotalExpenseDTO"

export interface IExpenseRepository {
  save(expense: Expense): Promise<void>
  getExpenseByUser(userId: string, page: number, limit: number): Promise<any>
  getSumByPeriod(params: GetTotalExpenseDTO): Promise<number>
}
