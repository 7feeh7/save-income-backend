import { uuid } from "uuidv4";

export class Income {
    public readonly id?: string;

    public user_id: string;
    public description: string;
    public amount: number;

    constructor(user_id: string, description: string, amount: number, id?: string) { 
        this.user_id = user_id;
        this.description = description;
        this.amount = amount;

        if (!id) {
            this.id = uuid();
        }
    }
}