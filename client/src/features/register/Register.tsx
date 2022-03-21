import { useState, useEffect } from 'react';
import * as API from './registerAPI';
import * as C from '../../utils/sharedComponents/login-signup';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Chat • Sign up';
  }, []);

  useEffect(() => {
    setUsernameError(getUsernameError());
    setPasswordError(getPasswordError());
  });

  const getUsernameError = () => {
    if (username.search(/\W/) !== -1) {
      return 'Only letters and numbers allowed.';
    } else if (username.length < 5 || username.length > 16) {
      return 'Username must be between 5~16 characters long.';
    } else {
      return '';
    }
  };

  const getPasswordError = () => {
    if (password.length < 5 || password.length > 50) {
      return 'Password must be between 5~50 characters long.';
    } else {
      return '';
    }
  };

  const onSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);
    setFormError('');
    setFormSuccess('');

    const code = await API.registerUser({ username, password });

    setSubmitting(false);

    if (code === 201) setFormSuccess('Account created! You can now sign in.');
    else if (code === 409) setFormError('This username is already registered!');
    else setFormError('Something went wrong. Try Again.');
  };

  return (
    <C.Base
      title="Sign Up"
      subText="Already have an account?"
      subLink={`${window.location.origin}/login`}
      subLinkText="Sign in"
      bgColor="signup-bg"
    >
      <C.Form
        onSubmit={onSubmit}
        submitText="Sign up"
        submitting={submitting}
        formSuccess={formSuccess}
        formError={formError}
        inputError={usernameError || passwordError ? true : false}
      >
        <C.UsernameInput
          placeholder="Choose a username"
          value={username}
          setValue={setUsername}
          error={usernameError}
        />
        <C.PasswordInput
          placeholder="Choose a password"
          value={password}
          setValue={setPassword}
          error={passwordError}
        />
      </C.Form>
    </C.Base>
  );
};

export default SignUp;
