import React, { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContextType } from '../../@types/Todo';
import { todoContext } from '../../context/todoContext';
import fetchWithTimeout from '../../helper/fetchWithTimeout';
import style from './signIn.module.css';

function SignIn() {
  const navigate = useNavigate();
  const { setReload } = useContext(todoContext) as TodoContextType;
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: '',
    repeatPass: '',
  });
  const { setUser } = useContext(todoContext) as TodoContextType;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: '' });

  const handleInput = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [name]: value });
  };

  const createUser = async () => {
    setLoading(true);
    try {
      if (inputs.password !== inputs.repeatPass) {
        setError({ error: 'Password must be Equal!' });
        setLoading(false);
        return;
      }
      const response = await fetchWithTimeout(`${process.env.REACT_APP_URL}/user/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputs.email,
          name: inputs.name,
          password: inputs.password,
        }),
      });

      const json = await response.json();
      setLoading(false);
      if (!response.ok) {
        setError(json);
        return;
      }
      navigate('../');
    } catch (e) {
      console.log('🚀', e);
      setError({ error: 'Request Timeout!' });
      setLoading(false);
    }
  };

  return (
    <div className={style['signIn-container']}>
      <h1>Create Account</h1>
      <input
        type="text"
        name="email"
        value={inputs.email}
        onChange={handleInput}
        className={style['signIn-input']}
        placeholder="Email"
      />
      <input
        type="text"
        name="name"
        value={inputs.name}
        onChange={handleInput}
        className={style['signIn-input']}
        placeholder="Name"
      />
      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={handleInput}
        className={style['signIn-input']}
        placeholder="Password"
      />
      <input
        type="password"
        name="repeatPass"
        value={inputs.repeatPass}
        onChange={handleInput}
        className={style['signIn-input']}
        placeholder="Repeat Password"
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
            <button onClick={createUser} type="button" className={style['signIn-button']}>Create</button>
          </div>
        )}
    </div>
  );
}

export default SignIn;
