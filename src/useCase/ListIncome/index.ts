import { PostgresIncomeRepository } from "../../repositories/implementations/PostgresIncomesRepository"
import { ListIncomeController } from "./ListIncomeController"
import { ListIncomeUseCase } from "./ListIncomeUseCase"

const postgresIncomeRepository = new PostgresIncomeRepository()

const listIncomeUseCase = new ListIncomeUseCase(postgresIncomeRepository)

const listIncomeController = new ListIncomeController(listIncomeUseCase)

export { listIncomeUseCase, listIncomeController }
