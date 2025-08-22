import { IncomeModel } from "@/infra/db/sequelize/models/Income"
import { Income } from "@/domain/entities/Income"
import { IIncomeRepository } from "@/domain/repositories/IIncomeRepository"

export class PostgresIncomeRepository implements IIncomeRepository {
  async save(income: Income): Promise<void> {
    await IncomeModel.create({
      ...income,
    })
  }

  async getIncomeByUser(userId: string): Promise<any> {
    return await IncomeModel.findAll({
      where: {
        user_id: userId,
      },
    })
  }
}
