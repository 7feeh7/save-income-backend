import { Income } from "@/entities/Income"
import { IIncomeRepository } from "@/repositories/IIncomeRepository"
import { formatCurrencyForPostgres } from "@/shared/utils/currency"
import { ICreateIncomeRequestDTO } from "./CreateIncomeDTO"

export class CreateIncomeUseCase {
  constructor(private incomeRepository: IIncomeRepository) { }

  async execute(data: ICreateIncomeRequestDTO) {
    const income = new Income(
      data.userId,
      data.description,
      Number(formatCurrencyForPostgres(data.amount)),
    )

    await this.incomeRepository.save(income)
  }
}
