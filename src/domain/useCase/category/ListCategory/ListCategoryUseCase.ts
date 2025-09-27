import { Expense } from "@/domain/entities/Expense"
import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository"

export class ListCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Expense> {
    return await this.categoryRepository.listCategory()
  }
}
