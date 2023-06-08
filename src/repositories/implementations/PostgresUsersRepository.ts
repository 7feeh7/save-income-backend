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
                "last_acess",
                "is_active"
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
            { token, last_acess: lastAcess },
            { where: { id: userId } }
        );
    }
}