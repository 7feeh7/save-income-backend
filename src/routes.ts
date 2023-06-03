import { Router } from "express";
import { createUserController } from "./useCase/CreateUser";
import { userProfileController } from "./useCase/UserProfile";

const router = Router()

router.post('/users', (request, response) => {
    return createUserController.handle(request, response);
});

router.get('/users/:id', (request, response) => {
    return userProfileController.handle(request, response);
});

export { router };