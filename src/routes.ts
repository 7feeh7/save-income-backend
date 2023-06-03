import { Router } from "express";
import { createUserController } from "./useCase/CreateUser";
import { userProfileController } from "./useCase/UserProfile";
import { loginController } from "./useCase/Login";

const router = Router()

router.post('/users', (request, response) => {
    return createUserController.handle(request, response);
});

router.get('/users/:id', (request, response) => {
    return userProfileController.handle(request, response);
});

router.post('/login', (request, response) => {
    return loginController.handle(request, response);
});

export { router };