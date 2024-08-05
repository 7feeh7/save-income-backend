import { PostgresIncomeRepository } from "@/repositories/implementations/PostgresIncomesRepository"
import { CreateIncomeController } from "./CreateIncomeController"
import { CreateIncomeUseCase } from "./CreateIncomeUseCase"

const postgresIncomeRepository = new PostgresIncomeRepository()

const createIncomeUseCase = new CreateIncomeUseCase(postgresIncomeRepository)

const createIncomeController = new CreateIncomeController(createIncomeUseCase)

export { createIncomeUseCase, createIncomeController }
