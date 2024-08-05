import { Income } from "@/entities/Income"
import { IIncomeRepository } from "@/repositories/IIncomeRepository"

export class ListIncomeUseCase {
  constructor(private incomeRepository: IIncomeRepository) { }

  async execute(id: string): Promise<Income> {
    return await this.incomeRepository.getIncomeByUser(id)
  }
}
