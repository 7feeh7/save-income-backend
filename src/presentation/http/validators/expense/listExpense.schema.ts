import { z } from "zod"

export const listExpenseQuerySchema = z
  .object({
    page: z.coerce.number().int().min(0).default(0).optional(),
    limit: z.coerce.number().int().min(0).default(0).optional(),
  })
  .strict()
