import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class UserModel extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public phone!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserModel.init({
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
    }
}, {
    tableName: 'users',
    timestamps: true,
    sequelize
})