import { DataTypes, Model } from "sequelize"
import { sequelize } from "../sequelize"
import { RoleModel } from "./Role"

export class UserModel extends Model {
  public id!: string
  public name!: string
  public email!: string
  public phone!: string
  public password!: string
  public token?: string
  public roleId!: number
  public lastAcess?: Date | null
  public isActive!: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      field: "role_id",
    },
    lastAcess: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_acess",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    sequelize,
  },
)

UserModel.belongsTo(RoleModel, {
  foreignKey: "role_id",
  as: "role",
})

RoleModel.hasMany(UserModel, {
  foreignKey: "role_id",
})
