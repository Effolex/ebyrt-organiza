/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { TodoContextType } from '../../@types/Todo';
import { todoContext } from '../../context/todoContext';
import style from './dashboard.module.css';
import { ReactComponent as UserSVG } from '../../assets/user.svg';

const Dashboard = () => {
  const { user } = useContext(todoContext) as TodoContextType;
  return (
    <div className={style.window}>
      <div className={style.sideMenu}>
        <UserSVG />
        <div className={style.userInfo}>
          <p>{user?.name}</p>
        </div>
        <Link to="new">Add new</Link>
        <Link to=" ">List All</Link>
        <Link to="settings">Settings</Link>
        <Link to="/">Log Out</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
