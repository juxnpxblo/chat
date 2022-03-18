import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { selectLoggedUser } from './features/login/loginSlice';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Chat, Login, Register } from './features';
import './index.css';

const App = () => {
  const loggedUser = useAppSelector(selectLoggedUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={loggedUser ? <Chat /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={loggedUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={loggedUser ? <Navigate to="/" /> : <Register />}
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
