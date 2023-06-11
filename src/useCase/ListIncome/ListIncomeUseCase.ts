import { User } from "../../entities/User";
import { IIncomeRepository } from "../../repositories/IIncomeRepository";

export class ListIncomeUseCase {
    constructor(
        private incomeRepository: IIncomeRepository,
    ) {}

    async execute(id: string): Promise<User> {
        return await this.incomeRepository.getIncomeByUser(id);
    }
}