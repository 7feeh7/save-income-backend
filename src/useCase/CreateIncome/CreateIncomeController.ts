import { Request, Response } from "express";
import { CreateIncomeUseCase } from "./CreateIncomeUseCase";

export class CreateIncomeController {
    constructor(
        private createIncomeUseCase: CreateIncomeUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { userId, description, amount } = request.body;
        
        try {
            await this.createIncomeUseCase.execute({
                userId,
                description,
                amount
            });

            return response.status(201).json({ 
                message: "Successfully registered income." 
            });
        } catch (err: unknown) {
            return response.status(400).json({
                message: (err as Error).message || 'Unexpected error.'
            })
        }
    }

}