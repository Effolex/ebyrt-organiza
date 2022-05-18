import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import styles from './styles/App.module.css';
import video from './assets/backgroundPattern.mp4';
import TodoProvider from './context/todoContext';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <TodoProvider>
      <div className={styles.global}>
        <div className={styles.videoContainer}>
          <video width="320" height="240" autoPlay loop muted>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TodoProvider>
  );
}

export default App;
