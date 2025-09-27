import { Router } from "express"
import { adaptMiddleware } from "@/presentation/http/adapters/ExpressMiddlewareAdapter"
import { createExpenseController } from "@/domain/useCase/expense/CreateExpense"
import { listExpenseController } from "@/domain/useCase/expense/ListExpense"
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware"
import { validateBody, validateQuery } from "../middlewares/validation.middleware"
import { createExpenseSchema } from "../validators/expense/createExpense.schema"
import { getTotalExpenseController } from "@/domain/useCase/expense/GetTotalExpense"
import { totalExpenseSchema } from "../validators/expense/totalExpense.schema"

const expenseRouter = Router()

expenseRouter.use(adaptMiddleware(makeAuthMiddleware()))

expenseRouter.post(
  "/",
  validateBody(createExpenseSchema),
  (request, response) => {
    return createExpenseController.handle(request, response)
  },
)

expenseRouter.get("/", (request, response) => {
  return listExpenseController.handle(request, response)
})

/**
 * @openapi
 * /expense/total:
 *   get:
 *     tags: [Expenses]
 *     summary: Get total expense amount for a period
 *     description: Retrieve the sum of all expense amounts for the authenticated user, filtered by date range.
 *     operationId: getTotalexpense
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: false
 *         description: Start date for filtering (YYYY-MM-DD format)
 *         schema:
 *           type: string
 *           example: "2024-01-01"
 *       - name: endDate
 *         in: query
 *         required: false
 *         description: End date for filtering (YYYY-MM-DD format)
 *         schema:
 *           type: string
 *           example: "2024-12-31"
 *     responses:
 *       200:
 *         description: Total expense amount retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   format: float
 *                   description: Sum of all expense amounts in the period
 *                   example: 2500.75
 *       400:
 *         description: Validation error in query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidDate:
 *                 summary: Invalid date format
 *                 value:
 *                   success: false
 *                   errors:
 *                     - field: "startDate"
 *                       message: "Invalid start date. Use YYYY-MM-DD format."
 *               invalidPeriod:
 *                 summary: Invalid date range
 *                 value:
 *                   success: false
 *                   errors:
 *                     - field: "startDate"
 *                       message: "Start date cannot be greater than end date"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *             example:
 *               message: "Access Denied."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
expenseRouter.get("/total",
  validateQuery(totalExpenseSchema),
  (request, response) => {
    return getTotalExpenseController.handle(request, response)
  })

export { expenseRouter }
