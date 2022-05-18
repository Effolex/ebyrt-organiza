import React, { useContext, useEffect, useState } from 'react';
import { ITask, TodoContextType } from '../../../../@types/Todo';
import { todoContext } from '../../../../context/todoContext';
import { ITaskFilter } from './main';
import style from './main.module.css';

function Main() {
  const { tasks } = useContext(todoContext) as TodoContextType;
  const [inProgress, setInProgress] = useState<ITask[] | never[]>([]);
  const [pending, setPending] = useState<ITask[] | never[]>([]);
  const [done, setDone] = useState<ITask[] | never[]>([]);

  useEffect(() => {
    const filtered = (tasks as ITask[]).reduce<ITaskFilter>(
      (acc: ITaskFilter, task: ITask) => {
        if (task.status === 'pendente') {
          return {
            ...acc,
            pending: [...acc.pending, task],
          };
        }
        if (task.status === 'em andamento') {
          return {
            ...acc,
            inProgress: [...acc.inProgress, task],
          };
        }
        if (task.status === 'pronto') {
          return {
            ...acc,
            done: [...acc.done, task],
          };
        }
        return acc;
      },
      { inProgress: [], done: [], pending: [] },
    );

    setDone(filtered.done);
    setInProgress(filtered.inProgress);
    setPending(filtered.pending);
  }, [tasks]);

  return (
    <div className={style.content}>
      <div className={style.statusContainer}>
        <h1>Em Andamento</h1>
      </div>
      <div className={style.statusContainer}>
        <h1>pendente</h1>
        {pending.map((task, i) => (
          <div className={
            `${style.task} ${(i % 2) ? style.odd : style.even}`
          }
          >
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            {task.tags.map((tag) => (
              <button className={style.tag} type="button">{tag.name}</button>
            ))}
          </div>
        ))}
      </div>
      <div className={style.statusContainer}>
        <h1>pronto</h1>
      </div>
    </div>
  );
}

export default Main;
