import { uuid } from "uuidv4";

export class User {
    public readonly id?: string;

    public name: string;
    public email: string;
    public phone: string;
    public password: string;
    public role_id?: unknown;

    constructor(name: string, email: string, phone: string, password: string, role_id?: unknown, id?: string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role_id = role_id;

        if (!id) {
            this.id = uuid();
        }
    }
}