import { IIncomeRepository } from "@/domain/repositories/IIncomeRepository"
import { GetTotalIncomeDTO } from "./GetTotalIncomeDTO"

export class GetTotalIncomeUseCase {
  constructor(private incomeRepository: IIncomeRepository) { }

  async execute({ id, startDate, endDate }: GetTotalIncomeDTO): Promise<number> {
    return await this.incomeRepository.getSumByPeriod({ id, startDate, endDate })
  }
}
