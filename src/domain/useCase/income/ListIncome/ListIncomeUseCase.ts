import { Income } from "@/domain/entities/Income"
import { IIncomeRepository } from "@/domain/repositories/IIncomeRepository"

interface ListIncomeDTO {
  id: string
  page: number
  limit: number
}
export class ListIncomeUseCase {
  constructor(private incomeRepository: IIncomeRepository) { }

  async execute({ id, page, limit }: ListIncomeDTO): Promise<Income> {
    return await this.incomeRepository.getIncomeByUser(id, page, limit)
  }
}
