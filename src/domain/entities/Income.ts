import { uuid } from "uuidv4"

export class Income {
  public readonly id?: string

  public userId: string
  public description: string
  public amount: number

  constructor(
    userId: string,
    description: string,
    amount: number,
    id?: string,
  ) {
    this.userId = userId
    this.description = description
    this.amount = amount

    if (!id) {
      this.id = uuid()
    }
  }
}
