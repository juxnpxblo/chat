import api from '../api/api';

import { useState } from 'react';
import URL from '../utils/URL';
import {
  Base,
  Form,
  PasswordInput,
  Subtitle,
  Title,
  RoundedWhiteBox,
  UsernameInput,
} from '../components/login-signup';

import { useContext } from 'react';
import userContext from '../utils/userContext';

import io from 'socket.io-client';

const Login = ({ socket }) => {
  const { setLoggedUser } = useContext(userContext);

  const [submitting, setSubmitting] = useState(false);

  const [formError, setFormError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    socket.emit('username', username);

    socket.on('connected', () => {
      setLoggedUser(username);
    });
  };

  const onSubmit = async () => {
    if (submitting) return;

    setFormError('');
    setSubmitting(true);

    const dbPassword = (await api.get(`/users/${username}/password`)).data
      .rows[0]?.password;

    if (!dbPassword) setFormError('This account is not registered!');
    else if (dbPassword === password) onLogin();
    else if (dbPassword !== password) setFormError('Incorrect password.');

    setSubmitting(false);
  };

  return (
    <Base bgColor="login-bg">
      <div className="w-[380px] mx-auto">
        <RoundedWhiteBox>
          <div className="mb-1">
            <Title text="Login" />
          </div>
          <div className="mb-4">
            <Subtitle
              text="Don't have an account?"
              link={`${URL}/register`}
              linkText="Sign up"
            />
          </div>
          <Form
            onSubmit={onSubmit}
            submitText="Login"
            submitting={submitting}
            formError={formError}
            inputError={username.length < 5 || password.length < 5}
          >
            <UsernameInput
              placeholder="Type your username"
              state={username}
              setState={setUsername}
            />
            <PasswordInput
              placeholder="Type your password"
              state={password}
              setState={setPassword}
            />
          </Form>
        </RoundedWhiteBox>
      </div>
    </Base>
  );
};

export default Login;
