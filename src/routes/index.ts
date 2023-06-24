import { Router } from "express";
import { authRouter } from "./auth"
import { userRouter } from "./user";
import { userAuthenticatedRouter } from "./user";
import { incomeRouter } from "./income";
import { expenseRouter } from "./expense";

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/users', userAuthenticatedRouter);
router.use('/income', incomeRouter);
router.use('/expense', expenseRouter);

export { router };
