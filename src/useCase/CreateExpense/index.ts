import { PostgresExpenseRepository } from "../../repositories/implementations/PostgresExpenseRepository"
import { CreateExpenseController } from "./CreateExpenseController"
import { CreateExpenseUseCase } from "./CreateExpenseUseCase"

const postgresExpenseRepository = new PostgresExpenseRepository()

const createExpenseUseCase = new CreateExpenseUseCase(postgresExpenseRepository)

const createExpenseController = new CreateExpenseController(
  createExpenseUseCase,
)

export { createExpenseUseCase, createExpenseController }
