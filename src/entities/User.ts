import { uuid } from "uuidv4";

export class User {
    public readonly id?: string;

    public name: string;
    public email: string;
    public phone: string;
    public password: string;

    constructor(name: string, email: string, phone: string, password: string, id?: string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;

        if(!id) {
            this.id = uuid();
        }
    }
}