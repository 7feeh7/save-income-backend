import { Income } from "../entities/Income";

export interface IIncomeRepository {
    save(income: Income): Promise<void>
    getIncomeByUser(userId: string): Promise<any>
}