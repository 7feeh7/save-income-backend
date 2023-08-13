import { CategoryModel } from "../../database/models/Category";
import { ExpenseModel } from "../../database/models/Expense";
import { Expense } from "../../entities/Expense";
import { IExpenseRepository } from "../IExpenseRepository";

export class PostgresExpenseRepository implements IExpenseRepository {
    async save(expense: Expense): Promise<void> {
        await ExpenseModel.create({
            ...expense
        });
    }
    async getExpenseByUser(userId: string): Promise<any> {
        return await ExpenseModel.findAll({
            include: [
                {
                    attributes: ["id", "name"],
                    model: CategoryModel,
                    as: "category",
                }
            ],
            where: { user_id: userId }
        });
    }
}