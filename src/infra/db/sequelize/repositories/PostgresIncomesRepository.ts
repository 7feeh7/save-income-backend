import { IncomeModel } from "@/infra/db/sequelize/models/Income"
import { Income } from "@/domain/entities/Income"
import { IIncomeRepository } from "@/domain/repositories/IIncomeRepository"
import { calculatePagination } from "@/shared/utils/paginationUtils"

export class PostgresIncomeRepository implements IIncomeRepository {
  async save(income: Income): Promise<void> {
    await IncomeModel.create({
      ...income,
    })
  }

  async getIncomeByUser(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<any> {
    const { offset, limit } = calculatePagination({ page, pageSize })

    const { count, rows } = await IncomeModel.findAndCountAll({
      where: {
        user_id: userId,
      },
      offset,
      limit,
    })
    
    return { data: rows, total: count }
  }
}
