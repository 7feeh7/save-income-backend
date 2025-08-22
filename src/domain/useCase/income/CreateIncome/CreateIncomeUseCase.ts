import { Income } from "@/domain/entities/Income"
import { IIncomeRepository } from "@/domain/repositories/IIncomeRepository"
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
