import { Request, Response } from "express";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

export class CreateExpenseController {
    constructor(
        private createExpenseUseCase: CreateExpenseUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { userId, categoryId, description, amount, isFixed } = request.body;
        
        try {
            await this.createExpenseUseCase.execute({
                userId,
                categoryId,
                description,
                amount,
                isFixed
            });

            return response.status(201).json({ 
                message: "Successfully registered expense." 
            });
        } catch (err: unknown) {
            return response.status(400).json({
                message: (err as Error).message || 'Unexpected error.'
            })
        }
    }

}