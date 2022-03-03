import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Chat, Login, SignUp } from './views';

import io from 'socket.io-client';

import './index.css';

import userContext from './utils/userContext';

const App = () => {
  const [loggedUser, setLoggedUser] = useState('');

  const socket = io(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : window.location.origin
    }`,
    {
      cors: {
        origin: `${
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000'
            : window.location.origin
        }`,
        credentials: true,
      },
      transports: ['websocket', 'polling'],
    }
  );

  useEffect(() => {
    if (loggedUser) socket.emit('username', loggedUser);
  }, [socket, loggedUser]);

  return (
    <userContext.Provider value={{ loggedUser, setLoggedUser }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loggedUser ? <Chat socket={socket} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              loggedUser ? <Navigate to="/" /> : <Login socket={socket} />
            }
          />
          <Route
            path="/register"
            element={loggedUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/*"
            element={
              loggedUser ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
