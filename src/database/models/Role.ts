import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class RoleModel extends Model {
    public id!: string;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RoleModel.init(
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
    }
  },
  {
    tableName: 'roles',
    timestamps: true,
    sequelize,
  }
);


