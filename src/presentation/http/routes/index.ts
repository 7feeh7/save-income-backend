import { Router } from "express"
import { authRouter } from "./auth"
import { userRouter } from "./user"
import { userAuthenticatedRouter } from "./user"
import { incomeRouter } from "./income"
import { expenseRouter } from "./expense"
import { categoryRouter } from "./category"

const router = Router()

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/users", userAuthenticatedRouter)
router.use("/income", incomeRouter)
router.use("/expense", expenseRouter)
router.use("/categories", categoryRouter)

export { router }
