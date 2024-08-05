export interface ICreateExpenseRequestDTO {
  userId: string
  categoryId: string
  description: string
  amount: number
  isFixed?: boolean
}
