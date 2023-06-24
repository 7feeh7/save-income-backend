import { uuid } from "uuidv4";

export class Expense {
    public readonly id?: string;

    public userId: string;
    public categoryId: string;
    public description: string;
    public amount: number;

    constructor(userId: string, categoryId: string, description: string, amount: number, id?: string) { 
        this.userId = userId;
        this.categoryId = categoryId;
        this.description = description;
        this.amount = amount;

        if (!id) {
            this.id = uuid();
        }
    }
}