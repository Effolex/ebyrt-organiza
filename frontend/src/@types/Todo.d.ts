// @types.todo.ts

export interface ITask {
  id: number,
  createdAt: string,
  title: string,
  status: 'pendente' | 'em andamento' | 'pronto',
  description: string,
  authorId: number,
  tags: ITag[]
}

export interface ITag {
  id: number,
  name: string,
  author: number,
  taskId: number,
}

export interface IUser {
  id: number,
  email: string,
  name: string,
  token: string
}

export type TodoContextType = {
  tasks: ITask[] | never[];
  user: IUser | undefined,
  reload: boolean,
  setUser: (user: IUser) => void;
  setTasks: (tasks: ITask[]) => void;
  setReload: (bool: boolean) => void;
};
