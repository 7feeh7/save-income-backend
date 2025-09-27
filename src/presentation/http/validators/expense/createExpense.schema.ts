import { z } from "zod"

export const createExpenseSchema = z
  .object({
    userId: z.string().uuid("invalid user id"),
    categoryId: z.string(),
    description: z.string().min(3, "description must have at least 3 chars"),
    amount: z.string(),
    isFixed: z.coerce.boolean().default(false),
  })
  .strict()

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>
