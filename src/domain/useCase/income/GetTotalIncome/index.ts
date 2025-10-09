import { PostgresIncomeRepository } from "@/infra/db/sequelize/repositories/PostgresIncomesRepository"
import { GetTotalIncomeUseCase } from "./GetTotalIncomeUseCase"
import { GetTotalIncomeController } from "@/presentation/http/controllers/income/GetTotalIncomeController"

const postgresIncomeRepository = new PostgresIncomeRepository()

const getTotalIncomeUseCase = new GetTotalIncomeUseCase(
  postgresIncomeRepository,
)

const getTotalIncomeController = new GetTotalIncomeController(
  getTotalIncomeUseCase,
)

export { getTotalIncomeUseCase, getTotalIncomeController }
