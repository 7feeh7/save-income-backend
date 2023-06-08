import { Router } from "express";
import { adaptMiddleware } from "../adapters/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware";
import { createUserController } from "../useCase/CreateUser";
import { userProfileController } from "../useCase/UserProfile";

const userRouter = Router();

userRouter.use(adaptMiddleware(makeAuthMiddleware()));

userRouter.post('/', (request, response) => {
    return createUserController.handle(request, response);
});

userRouter.get('/:id', (request, response) => {
    return userProfileController.handle(request, response);
});

export { userRouter };