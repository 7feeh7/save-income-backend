import { PostgresIncomeRepository } from "@/infra/db/sequelize/repositories/PostgresIncomesRepository"
import { ListIncomeUseCase } from "./ListIncomeUseCase"
import { ListIncomeController } from "@/presentation/http/controllers/income/ListIncomeController"

const postgresIncomeRepository = new PostgresIncomeRepository()

const listIncomeUseCase = new ListIncomeUseCase(postgresIncomeRepository)

const listIncomeController = new ListIncomeController(listIncomeUseCase)

export { listIncomeUseCase, listIncomeController }
