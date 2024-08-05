export class IUser {
  id: string

  constructor(val: any) {
    Object.assign(this, val)
  }
}
