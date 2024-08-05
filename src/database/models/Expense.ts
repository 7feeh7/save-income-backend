import { DataTypes, Model } from "sequelize"
import { sequelize } from "../sequelize"
import { UserModel } from "./User"
import { CategoryModel } from "./Category"

export class ExpenseModel extends Model {
  public id!: string
  public userId!: string
  public categoryId!: string
  public description!: string
  public amount!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ExpenseModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "user_id",
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "category_id",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    isFixed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_fixed",
    },
  },
  {
    tableName: "expenses",
    timestamps: true,
    sequelize,
  },
)

ExpenseModel.belongsTo(UserModel, {
  foreignKey: "userId",
})

UserModel.hasMany(ExpenseModel, {
  foreignKey: "userId",
})

ExpenseModel.belongsTo(CategoryModel, {
  foreignKey: "categoryId",
  as: "category",
})

CategoryModel.hasMany(ExpenseModel, {
  foreignKey: "categoryId",
})
