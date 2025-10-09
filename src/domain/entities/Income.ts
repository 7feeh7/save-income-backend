import { uuid } from "uuidv4"

export class Income {
  public readonly id?: string

  public userId: string
  public description: string
  public amount: number
  public date: Date

  constructor(
    userId: string,
    description: string,
    amount: number,
    date: Date,
    id?: string,
  ) {
    this.userId = userId
    this.description = description
    this.amount = amount
    this.date = date

    if (!id) {
      this.id = uuid()
    }
  }
}
