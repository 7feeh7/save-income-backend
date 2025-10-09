import { ExpenseModel } from "@/infra/db/sequelize/models/Expense"

export class IUser {
  id!: string

  constructor(val: any) {
    Object.assign(this, val)
  }
}

export interface ListExpenseDTO {
  id: string
  page: number
  pageSize: number
  order: string
  orderDirection: string
  categoryId?: number
  isFixed?: boolean   
}

export interface ExpenseListResult {
  data: ExpenseModel[]
  total: number
}