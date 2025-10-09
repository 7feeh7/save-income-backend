import { CategoryModel } from "@/infra/db/sequelize/models/Category"
import { ExpenseModel } from "@/infra/db/sequelize/models/Expense"
import { Expense } from "@/domain/entities/Expense"
import { IExpenseRepository } from "@/domain/repositories/IExpenseRepository"
import { calculatePagination } from "@/shared/utils/paginationUtils"
import { GetTotalExpenseDTO } from "@/domain/useCase/expense/GetTotalExpense/GetTotalExpenseDTO"
import { Op, WhereOptions} from "sequelize"
import { ExpenseListResult, ListExpenseDTO } from "@/domain/useCase/expense/ListExpense/ListExpenseDTO"

export class PostgresExpenseRepository implements IExpenseRepository {
  async save(expense: Expense): Promise<void> {
    await ExpenseModel.create({
      ...expense,
    })
  }

  async getExpenseByUser(params: ListExpenseDTO): Promise<ExpenseListResult> {
    const { id, page, pageSize, order, orderDirection, categoryId, isFixed } = params

    const { offset, limit } = calculatePagination({ page, pageSize })

    const whereOptions: WhereOptions = { user_id: id }

    if(categoryId) whereOptions.categoryId = categoryId

    if(isFixed) whereOptions.isFixed = isFixed

    const { count, rows } = await ExpenseModel.findAndCountAll({
      include: [
        {
          attributes: ["id", "name"],
          model: CategoryModel,
          as: "category",
        },
      ],
      where: whereOptions,
      offset,
      limit,
      order: [[order, orderDirection]]
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
          [Op.lt]: endDate,
        },
      },
    })

    return Number(sum || 0)
  }
}
