import { Router } from "express";
import { adaptMiddleware } from "../adapters/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware";
import { createIncomeController } from "../useCase/CreateIncome";
import { listIncomeController } from "../useCase/ListIncome";

const incomeRouter = Router();

incomeRouter.use(adaptMiddleware(makeAuthMiddleware()));

incomeRouter.post('/', (request, response) => {
    return createIncomeController.handle(request, response);
});

incomeRouter.get('/', (request, response) => {
    return listIncomeController.handle(request, response);
});

export {incomeRouter};