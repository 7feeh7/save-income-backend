import { z } from "zod"

export const totalIncomeSchema = z
  .object({
    startDate: z
      .string()
      .refine(
        (date) => {
          const parsedDate = new Date(date)
          return !isNaN(parsedDate.getTime())
        },
        {
          message: "Invalid start date. Use YYYY-MM-DD format.",
        },
      )
      .transform((date) => new Date(date)),

    endDate: z
      .string()
      .refine(
        (date) => {
          const parsedDate = new Date(date)
          return !isNaN(parsedDate.getTime())
        },
        {
          message: "Invalid end date. Use YYYY-MM-DD format.",
        },
      )
      .transform((date) => new Date(date)),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate
      }
      return true
    },
    {
      message: "Start date cannot be greater than end date",
      path: ["startDate"],
    },
  )

export type TotalIncomeInput = z.infer<typeof totalIncomeSchema>
