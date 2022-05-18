import React, { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContextType } from '../../@types/Todo';
import { todoContext } from '../../context/todoContext';
import style from './login.module.css';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(todoContext) as TodoContextType;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: '' });

  const handleInput = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    if (name === 'email') {
      setEmail(value);
      return;
    }
    setPassword(value);
  };

  const login = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_URL}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(json);
      return;
    }
    setUser({ ...json.user, token: json.token });
    navigate('../dashboard');
  };

  return (
    <div className={style['login-container']}>
      <h1>Ebyrt Organiza</h1>
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleInput}
        className={style['login-input']}
        placeholder="Email"
      />
      <input
        type="text"
        name="password"
        value={password}
        onChange={handleInput}
        className={style['login-input']}
        placeholder="Password"
      />
      {(!loading && error.error.length > 0) && (<p className={style.error}>{error.error}</p>)}
      {(loading)
        ? (
          <div className={style.loadingio}>
            <div className={style.ldio}>
              <div />
              <div />
            </div>
          </div>
        ) : (
          <div className={style['button-container']}>
            <button onClick={login} type="button" className={style['login-button']}>Enter</button>
            <button type="button" className={style['login-button']}>Sign In</button>
          </div>
        )}
    </div>
  );
}
