import React, { useContext } from 'react';
import { TodoContextType } from '../../@types/Todo';
import { todoContext } from '../../context/todoContext';
import style from './dashboard.module.css';

function Dashboard() {
  const { user } = useContext(todoContext) as TodoContextType;
  console.log('🚀 ~ file: Dashboard.tsx ~ line 8 ~ Dashboard ~ user', user);
  return (
    <div className={style.window}>
      <div className={style.sideMenu}>
        <div className={style.userInfo}>
          <p>{user?.name}</p>
        </div>
        <p>Add new</p>
        <p>Add</p>
      </div>
    </div>
  );
}

export default Dashboard;
