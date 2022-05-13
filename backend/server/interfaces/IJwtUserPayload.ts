export default interface IJwtUserPayload {
  data: {
    id?: number,
    email: string,
    name: string,
    password: string
  },
}