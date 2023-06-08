import { Router } from "express";
import { authRouter } from "./auth"
import { userRouter } from "./user";
import { incomeRouter } from "./income";

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/income', incomeRouter);

export { router };
