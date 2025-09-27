import { Income } from "@/domain/entities/Income"
import { GetTotalIncomeDTO } from "../useCase/income/GetTotalIncome/GetTotalIncomeDTO"

export interface IIncomeRepository {
  save(income: Income): Promise<void>
  getIncomeByUser(userId: string, page: number, limit: number): Promise<any>
  getSumByPeriod(params: GetTotalIncomeDTO): Promise<number>
}
