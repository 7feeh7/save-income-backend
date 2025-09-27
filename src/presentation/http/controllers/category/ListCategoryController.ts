import { Request, Response } from "express"
import { ListCategoryUseCase } from "@/domain/useCase/category/ListCategory/ListCategoryUseCase"

export class ListCategoryController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {

    const categorys = await this.listCategoryUseCase.execute()

    return response.json(categorys)
  }
}
