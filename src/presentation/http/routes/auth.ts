import { Router } from "express"
import { loginController } from "@/domain/useCase/auth/Login"
import { validateBody } from "@/presentation/http/middlewares/validation.middleware"
import { loginSchema } from "@/presentation/http/validators/auth/login.schema"

const authRouter = Router()

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: User login
 *     description: Authenticate user with email and password, returns JWT token
 *     operationId: loginUser
 *     requestBody:
 *       required: true
 *       description: User credentials
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *           example:
 *             email: "user@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               success: true
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               errors:
 *                 - field: "email"
 *                   message: "Invalid email format"
 *                 - field: "password"
 *                   message: "Password must be at least 6 characters"
 *       401:
 *         description: Unauthorized - invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *             example:
 *               success: false
 *               message: "Invalid email or password"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
authRouter.post("/login", validateBody(loginSchema), (request, response) => {
  return loginController.handle(request, response)
})

export { authRouter }
