import { PostgresExpenseRepository } from "@/infra/db/sequelize/repositories/PostgresExpenseRepository"
import { ListExpenseController } from "../../../../presentation/http/controllers/expense/ListExpenseController"
import { ListExpenseUseCase } from "./ListExpenseUseCase"

const postgresExpenseRepository = new PostgresExpenseRepository()

const listExpenseUseCase = new ListExpenseUseCase(postgresExpenseRepository)

const listExpenseController = new ListExpenseController(listExpenseUseCase)

export { listExpenseUseCase, listExpenseController }
