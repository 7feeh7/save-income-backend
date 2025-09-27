import { CategoryModel } from "@/infra/db/sequelize/models/Category"
import { ExpenseModel } from "@/infra/db/sequelize/models/Expense"
import { Expense } from "@/domain/entities/Expense"
import { IExpenseRepository } from "@/domain/repositories/IExpenseRepository"
import { calculatePagination } from "@/shared/utils/paginationUtils"
import { GetTotalExpenseDTO } from "@/domain/useCase/expense/GetTotalExpense/GetTotalExpenseDTO"
import { Op } from "sequelize"

export class PostgresExpenseRepository implements IExpenseRepository {
  async save(expense: Expense): Promise<void> {
    await ExpenseModel.create({
      ...expense,
    })
  }

  async getExpenseByUser(
    userId: string,
    page: number,
    pageSize: number,
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

  async getSumByPeriod(params: GetTotalExpenseDTO): Promise<number> {
    const { id, startDate, endDate } = params

    const sum = await ExpenseModel.sum("amount", {
      where: {
        userId: id,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lt]: endDate
        },
      },
    });

    return Number(sum || 0);
  }
}
