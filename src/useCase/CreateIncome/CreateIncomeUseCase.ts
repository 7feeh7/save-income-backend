import { Income } from "../../entities/Income";
import { IIncomeRepository } from "../../repositories/IIncomeRepository";
import { formatCurrencyForPostgres } from "../../utils/currency";
import { ICreateIncomeRequestDTO } from "./CreateIncomeDTO";

export class CreateIncomeUseCase {
    constructor(
        private incomeRepository: IIncomeRepository
    ){}
    
    async execute(data: ICreateIncomeRequestDTO) {
        const income = new Income(
            data.user_id,
            data.description,
            Number(formatCurrencyForPostgres(data.amount))
        );

        await this.incomeRepository.save(income);
    }

}