import { GetTotalExpenseController } from "@/presentation/http/controllers/expense/GetTotalExpenseController"
import { GetTotalExpenseUseCase } from "./GetTotalExpenseUseCase"
import { PostgresExpenseRepository } from "@/infra/db/sequelize/repositories/PostgresExpenseRepository"

const postgresExpenseRepository = new PostgresExpenseRepository()

const getTotalExpenseUseCase = new GetTotalExpenseUseCase(postgresExpenseRepository)

const getTotalExpenseController = new GetTotalExpenseController(getTotalExpenseUseCase)

export { getTotalExpenseUseCase, getTotalExpenseController }
