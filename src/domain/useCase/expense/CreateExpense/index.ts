import { PostgresExpenseRepository } from "@/infra/db/sequelize/repositories/PostgresExpenseRepository"
import { CreateExpenseUseCase } from "./CreateExpenseUseCase"
import { CreateExpenseController } from "@/presentation/http/controllers/expense/CreateExpenseController"

const postgresExpenseRepository = new PostgresExpenseRepository()

const createExpenseUseCase = new CreateExpenseUseCase(postgresExpenseRepository)

const createExpenseController = new CreateExpenseController(
  createExpenseUseCase,
)

export { createExpenseUseCase, createExpenseController }
