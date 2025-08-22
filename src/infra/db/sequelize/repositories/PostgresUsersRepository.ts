import { RoleModel } from "@/infra/db/sequelize/models/Role"
import { UserModel } from "@/infra/db/sequelize/models/User"
import { User } from "@/domain/entities/User"
import { IUsersRepository } from "@/domain/repositories/IUsersRepository"

export class PostgresUserRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<any> {
    return await UserModel.findOne({
      where: { email },
      raw: true,
    })
  }

  async save(user: User): Promise<void> {
    await UserModel.create({
      ...user,
    })
  }

  async userProfile(id: string): Promise<any> {
    return UserModel.findOne({
      attributes: ["id", "name", "email", "phone", "lastAcess", "isActive"],
      include: [
        {
          attributes: ["name"],
          model: RoleModel,
          as: "role",
        },
      ],
      where: { id },
    })
  }

  async refreshToken(
    userId: string,
    token: string,
    lastAcess: Date,
  ): Promise<void> {
    await UserModel.update({ token, lastAcess }, { where: { id: userId } })
  }

  async existUserWithToken(id: string, token: string): Promise<any> {
    return await UserModel.findOne({
      attributes: ["id", "name", "email"],
      include: [
        {
          attributes: ["name"],
          model: RoleModel,
          as: "role",
        },
      ],
      where: { id, token },
      raw: true,
    })
  }

  async findById(id: string): Promise<any> {
    return await UserModel.findOne({
      where: { id },
      raw: true,
    })
  }

  async update(user: any): Promise<void> {
    await UserModel.update(
      user,
      { where: { id: user.id } }
    )
  }

  async delete(id: string): Promise<void> {
    await UserModel.update(
      { isActive: false },
      { where: { id } }
    )
  }
}
