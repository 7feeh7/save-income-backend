import { IncomeModel } from "../../database/models/Income";
import { Income } from "../../entities/Income";
import { IIncomeRepository } from "../IIncomeRepository";

export class PostgresIncomeRepository implements IIncomeRepository {
    async save(income: Income): Promise<void> {
        await IncomeModel.create({
            ...income
        });
    }
}