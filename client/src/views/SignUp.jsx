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

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => (document.title = 'Chat • Login'), []);

  useEffect(() => {
    setUsernameError(getUsernameError());
    setPasswordError(getPasswordError());
  });

  const getUsernameError = () => {
    if (username.search(/\W/) !== -1) {
      return 'Only letters and numbers allowed.';
    }
    if (username.length < 5 || username.length > 16) {
      return 'Username must be between 5 and 16 characters long.';
    }
  };

  const getPasswordError = () => {
    if (password.length < 5 || password.length > 50) {
      return 'Password must be between 5 and 50 characters long.';
    }
  };

  const onSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);
    setUsername('');
    setPassword('');
    setFormError('');
    setFormSuccess('');

    const code = (await api.post('/users', { username, password })).data.code;

    if (code === '23505') {
      setSubmitting(false);
      setFormError('This username is already registered!');
    } else if (code === 1) {
      setSubmitting(false);
      setFormSuccess('Account created! You can now sign in.');
    } else {
      setSubmitting(false);
      setFormError('Something went wrong. Try Again.');
    }
  };

  return (
    <Base
      title="Sign Up"
      subText="Already have an account?"
      subLink={`${window.location.origin}/login`}
      subLinkText="Sign in"
      bgColor="signup-bg"
    >
      <Form
        onSubmit={onSubmit}
        submitText="Sign up"
        submitting={submitting}
        formSuccess={formSuccess}
        formError={formError}
        inputError={usernameError || passwordError ? true : false}
      >
        <UsernameInput
          placeholder="Choose a username"
          value={username}
          setValue={setUsername}
          error={usernameError}
        />
        <PasswordInput
          placeholder="Choose a password"
          value={password}
          setValue={setPassword}
          error={passwordError}
        />
      </Form>
    </Base>
  );
};

export default SignUp;
