import { z } from "zod"

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role_id
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           description: User's full name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "john@example.com"
 *         phone:
 *           type: string
 *           nullable: true
 *           description: User's phone number (optional)
 *           example: "+5511999999999"
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           description: User's password (min 6 characters)
 *           example: "password123"
 *         role_id:
 *           type: integer
 *           minimum: 1
 *           description: ID of the user's role
 *           example: 1
 */
export const createUserSchema = z
  .object({
    name: z.string().min(2, "name must have at least 2 chars"),
    email: z.string().email("invalid email"),
    phone: z.string().optional(),
    password: z.string().min(6, "password must have at least 6 chars"),
    role_id: z.coerce.number().int().positive(),
  })
  .strict()

export type CreateUserInput = z.infer<typeof createUserSchema>
