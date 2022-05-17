export interface IUser {
  id?: number,
  email: string,
  name?: string,
  password: string,
}

export interface IUserReq {
  email: string,
  name: string,
}