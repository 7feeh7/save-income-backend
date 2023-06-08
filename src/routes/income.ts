import { Router } from "express";
import { adaptMiddleware } from "../adapters/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware";
import { createIncomeController } from "../useCase/CreateIncome";

const incomeRouter = Router();

incomeRouter.use(adaptMiddleware(makeAuthMiddleware()));

incomeRouter.post('/', (request, response) => {
    return createIncomeController.handle(request, response);
});

export {incomeRouter};