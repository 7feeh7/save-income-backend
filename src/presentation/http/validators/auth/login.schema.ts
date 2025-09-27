import { TypeOf, z } from "zod"

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           description: User's password (min 6 characters)
 *           example: "password123"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         token:
 *           type: string
 *           description: JWT token for authenticated requests
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *     ValidationError:
 *       type: object
 *       properties:
 *         field:
 *           type: string
 *           description: Field that failed validation
 *           example: "email"
 *         message:
 *           type: string
 *           description: Error message
 *           example: "Invalid email format"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           description: General error message
 *           example: "Invalid credentials"
 *         errors:
 *           type: array
 *           description: List of validation errors (only for 400 responses)
 *           items:
 *             $ref: '#/components/schemas/ValidationError'
 *
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Invalid email or password"
 */
export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict()

export type LoginSchemaInput = TypeOf<typeof loginSchema>
