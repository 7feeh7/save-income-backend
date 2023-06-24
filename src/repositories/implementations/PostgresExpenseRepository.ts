import { ExpenseModel } from "../../database/models/Expense";
import { Expense } from "../../entities/Expense";
import { IExpenseRepository } from "../IExpenseRepository";

export class PostgresExpenseRepository implements IExpenseRepository {
    async save(expense: Expense): Promise<void> {
        await ExpenseModel.create({
            ...expense
        })
    }
}