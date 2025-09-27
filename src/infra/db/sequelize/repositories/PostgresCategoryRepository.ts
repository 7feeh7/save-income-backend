import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository"
import { CategoryModel } from "../models/Category"

export class PostgresCategoryRepository implements ICategoryRepository {
  async listCategory(): Promise<any> {
    return await CategoryModel.findAll();
  }
}
