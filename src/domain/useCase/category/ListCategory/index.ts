import { PostgresExpenseRepository } from "@/infra/db/sequelize/repositories/PostgresExpenseRepository"
import { ListExpenseController } from "../../../../presentation/http/controllers/expense/ListExpenseController"
import { ListCategoryUseCase } from "./ListCategoryUseCase"
import { PostgresCategoryRepository } from "@/infra/db/sequelize/repositories/PostgresCategoryRepository"
import { ListCategoryController } from "@/presentation/http/controllers/category/ListCategoryController"

const postgresCategoryRepository = new PostgresCategoryRepository()

const listCategoryUseCase = new ListCategoryUseCase(postgresCategoryRepository)

const listCategoryController = new ListCategoryController(listCategoryUseCase)

export { listCategoryUseCase, listCategoryController }
