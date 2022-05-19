import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser, TodoContextType } from '../../../../@types/Todo';
import { todoContext } from '../../../../context/todoContext';
import fetchWithTimeout from '../../../../helper/fetchWithTimeout';
import style from './newTask.module.css';

function NewTask() {
  const { user, setReload } = useContext(todoContext) as TodoContextType;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
    const response = await fetchWithTimeout(`${process.env.REACT_APP_URL}/task/create`, {
      method: 'POST',
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
    <form className={style.container} onSubmit={handleSubmit} action="">
      {(error) && <h1>{error}</h1>}
      <label htmlFor="newTask-title">
        Title
        <input
          type="text"
          name="title"
          id="newTask-title"
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
          className={style.input}
        />
      </label>
      <label htmlFor="newTask-description">
        Description
        <textarea
          name="description"
          id="newTask-description"
          cols={50}
          rows={10}
          className={style.input}
        />
      </label>
      <label htmlFor="newTask-status">
        Status
        <select className={style.input} name="status" id="newTask-status">
          <option defaultChecked value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="pronto">pronto</option>
        </select>
      </label>
      <button className={style.buttom} type="submit">Adicionar</button>
    </form>
  );
}

export default NewTask;
