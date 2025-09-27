import { z } from "zod"

export const createIncomeSchema = z
  .object({
    userId: z.string().uuid("invalid user id"),
    description: z.string().min(3, "description must have at least 3 chars"),
    amount: z.string(),
  })
  .strict()

export type CreateIncomeInput = z.infer<typeof createIncomeSchema>
