import { Expense } from "../entities/Expense";

export interface IExpenseRepository {
    save(income: Expense): Promise<void>
}