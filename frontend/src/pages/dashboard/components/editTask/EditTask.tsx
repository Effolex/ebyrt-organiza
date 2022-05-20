import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser, TodoContextType } from '../../../../@types/Todo';
import { todoContext } from '../../../../context/todoContext';
import fetchWithTimeout from '../../../../helper/fetchWithTimeout';
import style from './editTask.module.css';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, user, setReload } = useContext(todoContext) as TodoContextType;
  const [error, setError] = useState(null);
  const task = tasks.find((t) => t.id === +(id as string));
  const [inputs, setInputs] = useState({
    title: task?.title,
    description: task?.description,
    status: task?.status,
    tags: task?.tags.map((tag) => tag.name).join(','),
  });

  const handleInput = (event:React.SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      name: string,
      value: string,
    };
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const deleteTask = async () => {
    await fetchWithTimeout(`${process.env.REACT_APP_URL}/task/${task?.id}/delete`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: (user as IUser).token,
      },
    });
    setReload(true);
    navigate('../');
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      title: { value: string },
      tags: { value: string },
      description: { value: string },
      status: { value: string }
    };

    const body = {
      title: target.title.value,
      description: target.description.value,
      status: target.status.value,
      tags: target.tags.value.trim().split(',')
        .map((tag) => tag.trim()).filter((tag) => tag.length),
    };

    const response = await fetchWithTimeout(`${process.env.REACT_APP_URL}/task/${task?.id}/edit`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: (user as IUser).token,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (response.ok) {
      setError(null);
      setReload(true);
      navigate('../');
      return;
    }
    setError(json.error);
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <h1 className={style.topTitle}>Edit</h1>
      {(error) && <h1>{error}</h1>}
      <label htmlFor="newTask-title">
        Title
        <input
          type="text"
          value={inputs.title}
          onChange={handleInput}
          name="title"
          id="newTask-title"
          className={style.input}
        />
      </label>
      <label htmlFor="newTask-description">
        Description
        <textarea
          name="description"
          id="newTask-description"
          value={inputs.description}
          onChange={handleInput}
          cols={50}
          rows={10}
          className={style.input}
        />
      </label>
      <label htmlFor="newTask-tags">
        Tags
        <input
          type="text"
          name="tags"
          placeholder="tag1, tag2, tag3"
          id="newTask-tags"
          value={inputs.tags}
          onChange={handleInput}
          className={style.input}
        />
      </label>

      <label htmlFor="newTask-status">
        Status
        <select value={inputs.status} className={style.input} onChange={handleInput} name="status" id="newTask-status">
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="pronto">pronto</option>
        </select>
      </label>
      <button className={style.buttom} type="submit">Save</button>
      <button onClick={deleteTask} className={style.buttom} type="button">Delete</button>
    </form>
  );
}

export default EditTask;
