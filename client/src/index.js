import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Chat, Login, SignUp } from './views';

import './index.css';

const server = process.env.REACT_APP_SERVER_URL || window.location.origin;

const socket = io(server, {
  cors: {
    origin: server,
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

const App = () => {
  const [loggedUser, setLoggedUser] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            loggedUser ? (
              <Chat socket={socket} loggedUser={loggedUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            loggedUser ? (
              <Navigate to="/" />
            ) : (
              <Login setLoggedUser={setLoggedUser} />
            )
          }
        />
        <Route
          path="/register"
          element={loggedUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/*"
          element={loggedUser ? <Navigate to="/" /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
