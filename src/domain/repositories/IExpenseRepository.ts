import { Expense } from "@/domain/entities/Expense"
import { GetTotalExpenseDTO } from "../useCase/expense/GetTotalExpense/GetTotalExpenseDTO"
import { ExpenseListResult, ListExpenseDTO } from "../useCase/expense/ListExpense/ListExpenseDTO"

export interface IExpenseRepository {
  save(expense: Expense): Promise<void>
  getExpenseByUser(params: ListExpenseDTO): Promise<ExpenseListResult>
  getSumByPeriod(params: GetTotalExpenseDTO): Promise<number>
}
