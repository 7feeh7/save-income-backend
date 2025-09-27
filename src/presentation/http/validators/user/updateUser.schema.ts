import { z } from "zod"

export const updateUserParamsSchema = z.object({
  id: z.string().min(1, "invalid user id"),
})

export const updateUserBodySchema = z
  .object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    role_id: z.coerce.number().int().positive().optional(),
  })
  .strict()
