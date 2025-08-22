import bcrypt from "bcrypt"
import { bcryptSettings } from "@/config/auth"
import { IPasswordHasher } from "../IPasswordHasher"

export class BcryptPasswordHasherProvider implements IPasswordHasher {
    constructor(private readonly rounds = bcryptSettings.salts) { }

    hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.rounds)
    }

    compare(password: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(password, hashed)
    }
}
