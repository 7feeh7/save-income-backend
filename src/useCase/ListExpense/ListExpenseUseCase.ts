import { Expense } from "../../entities/Expense";
import { IExpenseRepository } from "../../repositories/IExpenseRepository";

export class ListExpenseUseCase {
    constructor(
        private expenseRepository: IExpenseRepository,
    ) {}

    async execute(id: string): Promise<Expense> {
        return await this.expenseRepository.getExpenseByUser(id);
    }
}