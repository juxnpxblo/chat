import api from '../api/api';

import { useState, useEffect } from 'react';

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

const SignUp = () => {
  const [submitting, setSubmitting] = useState(false);

  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const usernameErrorCheck = () => {
    if (username.search(/\W/) !== -1) {
      return 'Only letters and numbers allowed.';
    }
    if (username.length < 5 || username.length > 16) {
      return 'Username must be between 5 and 16 characters long.';
    }
  };

  const passwordErrorCheck = () => {
    if (password.length < 5 || password.length > 50) {
      return 'Password must be between 5 and 50 characters long.';
    }
  };

  useEffect(() => {
    setUsernameError(usernameErrorCheck());
    setPasswordError(passwordErrorCheck());
  });

  const onSubmit = async () => {
    if (submitting) return;
    else setSubmitting(true);

    setFormSuccess('');
    setFormError('');
    setPassword('');
    setUsername('');
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
    <Base bgColor="signup-bg">
      <div className="w-[380px] mx-auto">
        <RoundedWhiteBox>
          <div className="mb-1">
            <Title text="Sign Up" />
          </div>
          <div className="mb-4">
            <Subtitle
              text="Already have an account?"
              link={`${URL}/login`}
              linkText="Sign in"
            />
          </div>
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
              state={username}
              setState={setUsername}
              error={usernameError}
            />
            <PasswordInput
              placeholder="Choose a password"
              state={password}
              setState={setPassword}
              error={passwordError}
            />
          </Form>
        </RoundedWhiteBox>
      </div>
    </Base>
  );
};

export default SignUp;
