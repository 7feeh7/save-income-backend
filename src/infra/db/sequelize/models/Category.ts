import { DataTypes, Model } from "sequelize"
import { sequelize } from "@/infra/db/sequelize/sequelize"

export class CategoryModel extends Model {
  public id!: string
  public name!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    is_active: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "categorys",
    timestamps: true,
    sequelize,
  },
)
