import { useState, useEffect } from 'react';

import api from '../api/api';

import {
  Base,
  RoundedWhiteBox,
  Title,
  Subtitle,
  Form,
  UsernameInput,
  PasswordInput,
} from '../components/login-signup';

const Login = ({ setLoggedUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => (document.title = 'Chat • Login'), []);

  const onSubmit = async () => {
    if (submitting) return;

    setFormError('');
    setSubmitting(true);

    const dbPassword = (await api.get(`/users/${username}/password`)).data
      .rows[0]?.password;

    if (!dbPassword) setFormError('This account is not registered!');
    else if (dbPassword === password) setLoggedUser(username);
    else if (dbPassword !== password) setFormError('Incorrect password.');

    setSubmitting(false);
  };

  return (
    <Base
      title="Login"
      subText="Don't have an account?"
      subLink={`${window.location.origin}/register`}
      subLinkText="Sign up"
      bgColor="login-bg"
    >
      <Form
        inputError={username.length < 5 || password.length < 5}
        formError={formError}
        submitting={submitting}
        submitText="Login"
        onSubmit={onSubmit}
      >
        <UsernameInput
          placeholder="Type your username"
          value={username}
          setValue={setUsername}
        />
        <PasswordInput
          placeholder="Type your password"
          value={password}
          setValue={setPassword}
        />
      </Form>
    </Base>
  );
};

export default Login;
