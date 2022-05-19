/* eslint-disable react/function-component-definition */
import React, { useEffect, useMemo, useState } from 'react';
import { ITask, IUser, TodoContextType } from '../@types/Todo';

export const todoContext = React.createContext<TodoContextType | null>(null);

interface MyContextProps {
  children: React.ReactNode,
}

const TodoProvider:React.FC<MyContextProps> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[] | never[]>([]);
  const [user, setUser] = useState<IUser | undefined>();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!reload && tasks.length) {
      return;
    }
    if (user?.token) {
      (async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}/task/get`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: user.token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      })();
      setReload(false);
    }
  }, [user, reload]);

  const values:TodoContextType = useMemo(() => ({
    tasks,
    user,
    setUser,
    setTasks,
    setReload,
  }), [user, tasks]);

  return (
    <todoContext.Provider value={values}>
      { children }
    </todoContext.Provider>
  );
};

export default TodoProvider;
