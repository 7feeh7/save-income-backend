import { RoleModel } from "../../database/models/Role";
import { UserModel } from "../../database/models/User";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class PostgresUserRepository implements IUsersRepository {

    async findByEmail(email: string): Promise<any> {
        return UserModel.findOne({ where: { email } });
    }

    async save(user: User): Promise<void> {
        await UserModel.create({
            ...user
        });
    }

    async userProfile(id: string): Promise<any> {
        return UserModel.findOne({
            attributes: [
                "id",
                "name",
                "email",
                "phone",
                "lastAcess",
                "isActive"
            ],
            include: [
                {
                    attributes: ["name"],
                    model: RoleModel,
                    as: "role",
                },
            ],
            where: { id }
        });
    }

    async refreshToken(userId: string, token: string, lastAcess: Date): Promise<void> {
        await UserModel.update(
            { token, lastAcess },
            { where: { id: userId } }
        );
    }

    async existUserWithToken(id: string, token: string): Promise<any> {
        return await UserModel.findOne({ 
            where: { id, token }, 
            raw: true 
        });
    }
}