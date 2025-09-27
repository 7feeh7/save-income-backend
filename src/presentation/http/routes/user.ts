import { Router } from "express"
import { adaptMiddleware } from "@/presentation/http/adapters/ExpressMiddlewareAdapter"
import { createUserController } from "@/domain/useCase/user/CreateUser"
import { userProfileController } from "@/domain/useCase/user/UserProfile"
import { updateUserController } from "@/domain/useCase/user/UpdateUser"
import { deleteUserController } from "@/domain/useCase/user/DeleteUser"
import { makeAuthMiddleware } from "../middlewares/AuthMiddleware"
import {
  validateBody,
  validateParams,
} from "../middlewares/validation.middleware"
import { createUserSchema } from "../validators/user/createUser.schema"
import {
  updateUserBodySchema,
  updateUserParamsSchema,
} from "../validators/user/updateUser.schema"

const userRouter = Router()
const userAuthenticatedRouter = Router()

userAuthenticatedRouter.use(adaptMiddleware(makeAuthMiddleware()))

/**
 * @openapi
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Register a new user in the system. An email will be sent to the user upon successful registration.
 *     operationId: createUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *           example:
 *             name: "John Doe"
 *             email: "john@example.com"
 *             phone: "+5511999999999"
 *             password: "password123"
 *             role_id: 1
 *     responses:
 *       204:
 *         description: User created successfully (no content)
 *       400:
 *         description: Validation error
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
 *       409:
 *         description: Conflict - User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *
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
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
userRouter.post("/", validateBody(createUserSchema), (request, response) => {
  return createUserController.handle(request, response)
})

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user profile
 *     description: Retrieve user profile information by ID (requires authentication). Returns null if user not found.
 *     operationId: getUserProfile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "a7ce33f9-8f46-4c64-9aef-f312563f5608"
 *     responses:
 *       200:
 *         description: User profile retrieved successfully or user not found (returns null)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               nullable: true
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 phone:
 *                   type: string
 *                   nullable: true
 *                 lastAcess:
 *                   type: string
 *                   format: date-time
 *                 isActive:
 *                   type: boolean
 *                 role:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
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
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
userAuthenticatedRouter.get("/:id", (request, response) => {
  return userProfileController.handle(request, response)
})

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update user information
 *     description: Update user profile information (requires authentication)
 *     operationId: updateUser
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *           example:
 *             name: "John Updated"
 *             email: "john.updated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       403:
 *         description: Forbidden - Cannot update another user's profile
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
 *                   example: "Access denied"
 *       404:
 *         description: User not found
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
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 */
userAuthenticatedRouter.patch(
  "/:id",
  validateParams(updateUserParamsSchema),
  validateBody(updateUserBodySchema),
  (request, response) => {
    return updateUserController.handle(request, response)
  },
)

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user account
 *     description: Permanently delete a user account (requires authentication)
 *     operationId: deleteUser
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       204:
 *         description: User deleted successfully (no content)
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       403:
 *         description: Forbidden - Cannot delete another user's account
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
 *                   example: "Access denied"
 *       404:
 *         description: User not found
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
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 */
userAuthenticatedRouter.delete("/:id", (request, response) => {
  return deleteUserController.handle(request, response)
})

export { userRouter, userAuthenticatedRouter }
