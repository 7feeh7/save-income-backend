import { CategoryModel } from "@/infra/db/sequelize/models/Category"
import { ExpenseModel } from "@/infra/db/sequelize/models/Expense"
import { Expense } from "@/domain/entities/Expense"
import { IExpenseRepository } from "@/domain/repositories/IExpenseRepository"
import { calculatePagination } from "@/shared/utils/paginationUtils"

export class PostgresExpenseRepository implements IExpenseRepository {
  async save(expense: Expense): Promise<void> {
    await ExpenseModel.create({
      ...expense,
    })
  }

  async getExpenseByUser(
    userId: string,
    page: number,
    pageSize: number
  ): Promise<any> {
    const { offset, limit } = calculatePagination({ page, pageSize })

    const { count, rows } = await ExpenseModel.findAndCountAll({
      include: [
        {
          attributes: ["id", "name"],
          model: CategoryModel,
          as: "category",
        },
      ],
      where: { user_id: userId },
      offset,
      limit,
    })

    return { data: rows, total: count }
  }
}
