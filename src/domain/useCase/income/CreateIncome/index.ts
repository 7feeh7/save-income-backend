import { PostgresIncomeRepository } from "@/infra/db/sequelize/repositories/PostgresIncomesRepository"
import { CreateIncomeUseCase } from "./CreateIncomeUseCase"
import { CreateIncomeController } from "@/presentation/http/controllers/income/CreateIncomeController"

const postgresIncomeRepository = new PostgresIncomeRepository()

const createIncomeUseCase = new CreateIncomeUseCase(postgresIncomeRepository)

const createIncomeController = new CreateIncomeController(createIncomeUseCase)

export { createIncomeUseCase, createIncomeController }
