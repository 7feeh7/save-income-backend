import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { UserModel } from "./User";

export class IncomeModel extends Model {
    public id!: string;
    
    public user_id!: string;
    public description!: string;
    public amount!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

IncomeModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      }
  },
  {
    tableName: 'incomes',
    timestamps: true,
    sequelize,
  }
);

IncomeModel.belongsTo(UserModel, { 
    foreignKey: 'user_id' 
});

UserModel.hasMany(IncomeModel, { 
    foreignKey: 'user_id' 
});
