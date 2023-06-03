import { UserModel } from "../../database/models/User";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class PostgresUserRepository implements IUsersRepository {
    private users: User[] = [];

    async findByEmail(email: string): Promise<any> {
        return UserModel.findOne({ where: { email } });
    }

    async save(user: User): Promise<void> {
        await UserModel.create({
            ...user
        });
    }
}