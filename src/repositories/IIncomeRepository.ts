import { Income } from "../entities/Income";

export interface IIncomeRepository {
    save(user: Income): Promise<void>
}