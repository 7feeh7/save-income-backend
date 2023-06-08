import { Router } from "express";
import { loginController } from "../useCase/Login";

const authRouter = Router()

authRouter.post('/login', (request, response) => {
    return loginController.handle(request, response);
});

export { authRouter };