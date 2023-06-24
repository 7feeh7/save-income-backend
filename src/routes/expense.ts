import { Router } from "express";
import { adaptMiddleware } from "../adapters/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware";
import { createExpenseController } from "../useCase/CreateExpense";

const expenseRouter = Router();

expenseRouter.use(adaptMiddleware(makeAuthMiddleware()));

expenseRouter.post('/', (request, response) => {
    return createExpenseController.handle(request, response);
});

export { expenseRouter };