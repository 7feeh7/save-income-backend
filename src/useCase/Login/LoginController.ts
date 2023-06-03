import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
    constructor(
        private loginUseCase: LoginUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        try {
            await this.loginUseCase.execute({ email, password });

            return response.status(200).json({ message: 'Login successful' });
        } catch (err: unknown) {
            return response.status(400).json({
                message: (err as Error).message || 'Unexpected error.'
            })
        }
    }
}