import { PostgresExpenseRepository } from "../../repositories/implementations/PostgresExpenseRepository"
import { ListExpenseController } from "./ListExpenseController"
import { ListExpenseUseCase } from "./ListExpenseUseCase"

const postgresExpenseRepository = new PostgresExpenseRepository()

const listExpenseUseCase = new ListExpenseUseCase(postgresExpenseRepository)

const listExpenseController = new ListExpenseController(listExpenseUseCase)

export { listExpenseUseCase, listExpenseController }
