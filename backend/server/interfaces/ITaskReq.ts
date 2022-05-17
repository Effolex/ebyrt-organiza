export default interface ITaskReq {
  id?: number,
  title: string,
  status: string,
  description: string,
  tags?: string[],
}