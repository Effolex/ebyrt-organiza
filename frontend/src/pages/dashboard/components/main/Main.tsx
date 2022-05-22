/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  MouseEvent, useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ITask, IUser, TodoContextType } from '../../../../@types/Todo';
import { todoContext } from '../../../../context/todoContext';
import { ITaskFilter } from './main';
import style from './main.module.css';
import leftArrow from '../../../../assets/rightArrow.png';
import editIcon from '../../../../assets/edit.png';
import sortAsc from '../../../../assets/sortAsc.png';
import sortDesc from '../../../../assets/sortDesc.png';
import helpers from '../../../../helper';

const {
  changeStatus, incrementTagArray, dateFormater, fetchWithTimeout
} = helpers;

function Main() {
  const {
    tasks, user, setReload, reload,
  } = useContext(todoContext) as TodoContextType;
  const navigate = useNavigate();
  const [inProgress, setInProgress] = useState<ITask[]>([]);
  const [pending, setPending] = useState<ITask[]>([]);
  const [done, setDone] = useState<ITask[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  interface IFilter {
    type: keyof ITask,
    sort: 'asc' | 'desc',
    tagsFiltered: string,
  }
  const [filter, setFilter] = useState<IFilter>({
    type: 'createdAt',
    sort: 'asc',
    tagsFiltered: '',
  });

  useEffect(() => {
    const filtered = (tasks as ITask[]).reduce<ITaskFilter>(
      (acc: ITaskFilter, task: ITask) => {
        let newTask = { ...acc };
        if (task.status === 'pendente') {
          newTask = {
            ...acc,
            pending: [...acc.pending, task],
          };
        }
        if (task.status === 'em andamento') {
          newTask = {
            ...acc,
            inProgress: [...acc.inProgress, task],
          };
        }
        if (task.status === 'pronto') {
          newTask = {
            ...acc,
            done: [...acc.done, task],
          };
        }
        return { ...newTask, tags: incrementTagArray(newTask.tags, task.tags) };
      },
      {
        inProgress: [], done: [], pending: [], tags: [],
      },
    );

    setDone(filtered.done);
    setInProgress(filtered.inProgress);
    setPending(filtered.pending);
    setTags(filtered.tags);
  }, [tasks]);

  const sortTasks = (arr: ITask[]) => (
    arr.sort((a, b) => (
      (filter.sort === 'asc')
        ? (a[(filter.type)] as string).localeCompare((b[(filter.type)] as string))
        : (b[(filter.type)] as string).localeCompare((a[(filter.type)] as string))
    ))
  );

  useEffect(() => {
    setDone(sortTasks(done));
    setPending(sortTasks(pending));
    setInProgress(sortTasks(inProgress));
  }, [filter]);

  const sendStatusChange = async (event: MouseEvent<HTMLImageElement>, task: ITask) => {
    const target = event.target as typeof event.target & {
      alt: string
      className: string,
    };

    const body = {
      status: changeStatus(target.alt, task.status),
    };

    await fetchWithTimeout(`${process.env.REACT_APP_URL}/task/${task.id}/edit`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: (user as IUser).token,
      },
      body: JSON.stringify(body),
    });
    setReload(true);
  };

  const mappedStatus = (task: ITask, i: number) => (
    <div
      className={
        `${style.task} ${(i % 2) ? style.odd : style.even}`
      }
      key={task.id}
    >
      {(task.status !== 'em andamento') && (
        <img
          onClick={(e) => sendStatusChange(e, task)}
          alt="Left Arrow"
          src={leftArrow}
          className={style.leftArrow}
        />
      ) }
      {(task.status !== 'pronto') && (
        <img
          onClick={(e) => sendStatusChange(e, task)}
          alt="Right Arrow"
          src={leftArrow}
          className={style.rightArrow}
        />
      ) }
      <img
        onClick={() => navigate(`${task.id}/edit`)}
        alt="Edit"
        src={editIcon}
        className={style.editIcon}
      />
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>{dateFormater(task.createdAt)}</p>
      {task.tags.map((tag) => (
        <button className={style.tag} type="button">{tag.name}</button>
      ))}
    </div>
  );

  const setFilterTag = (event: React.SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      value: string,
    };
    setFilter({ ...filter, tagsFiltered: target.value });
  };

  return (
    <div className={style.exteriorContainer}>
      {(reload) && (
      <div className={style.loadingio}>
        <div className={style.ldio}>
          <div />
          <div />
        </div>
      </div>
      )}
      <div className={style.filterContainer}>
        <h1>Filter by:</h1>
        <button
          className={`${style.input} ${(filter.type === 'title') ? style.active : ''}`}
          onClick={() => setFilter({ ...filter, type: 'title' })}
          type="button"
        >
          Title
        </button>
        <img
          alt="Sort Asc"
          onClick={() => setFilter({
            ...filter,
            sort: (filter.sort === 'desc') ? 'asc' : 'desc',
          })}
          src={(filter.sort === 'asc') ? sortDesc : sortAsc}
          className={`${style.input}`}
        />
        <button
          className={`${style.input} ${(filter.type === 'createdAt') ? style.active : ''}`}
          onClick={() => setFilter({ ...filter, type: 'createdAt' })}
          type="button"
        >
          Date
        </button>
        <label className={style.label} htmlFor="main-tags-filter">
          Tags:
          <select
            className={style.input}
            name="status"
            id="newTask-status"
            onClick={setFilterTag}
          >
            <option defaultChecked value="">All</option>
            { tags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </label>
        <button
          className={style.reload}
          onClick={() => setReload(true)}
          type="button"
        >
          Reload Data
        </button>
      </div>
      <div className={style.content}>
        <div className={style.statusContainer}>
          <h1>Em Andamento</h1>
          <div className={style.taskContainer}>
            {inProgress.filter((t) => t.tags.some(
              (tag) => tag.name.includes(filter.tagsFiltered),
            )).map(mappedStatus)}
          </div>
        </div>
        <div className={style.statusContainer}>
          <h1>Pendente</h1>
          <div className={style.taskContainer}>
            {pending.filter((t) => t.tags.some(
              (tag) => tag.name.includes(filter.tagsFiltered),
            )).map(mappedStatus)}
          </div>
        </div>
        <div className={style.statusContainer}>
          <h1>Pronto</h1>
          <div className={style.taskContainer}>
            {done.filter((t) => t.tags.some(
              (tag) => tag.name.includes(filter.tagsFiltered),
            )).map(mappedStatus)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
