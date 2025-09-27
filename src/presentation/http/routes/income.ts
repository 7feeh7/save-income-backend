import { Router } from "express"
import { adaptMiddleware } from "@/presentation/http/adapters/ExpressMiddlewareAdapter"
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware"
import { createIncomeController } from "@/domain/useCase/income/CreateIncome"
import { listIncomeController } from "@/domain/useCase/income/ListIncome"
import { validateBody, validateQuery } from "../middlewares/validation.middleware"
import { createIncomeSchema } from "../validators/income/createIncome.schema"
import { getTotalIncomeController } from "@/domain/useCase/income/GetTotalIncome"
import { totalIncomeSchema } from "../validators/income/totalIncome.schema"

const incomeRouter = Router()

incomeRouter.use(adaptMiddleware(makeAuthMiddleware()))

incomeRouter.post(
  "/",
  validateBody(createIncomeSchema),
  (request, response) => {
    return createIncomeController.handle(request, response)
  },
)

incomeRouter.get("/", (request, response) => {
  return listIncomeController.handle(request, response)
})

/**
 * @openapi
 * /income/total:
 *   get:
 *     tags: [Incomes]
 *     summary: Get total income amount for a period
 *     description: Retrieve the sum of all income amounts for the authenticated user, filtered by date range.
 *     operationId: getTotalIncome
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
 *         description: Total income amount retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   format: float
 *                   description: Sum of all income amounts in the period
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
incomeRouter.get("/total",
  validateQuery(totalIncomeSchema),
  (request, response) => {
    return getTotalIncomeController.handle(request, response)
  })

export { incomeRouter }
