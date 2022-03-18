import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import * as LoginSlice from './loginSlice';
import * as C from '../../utils/sharedComponents/login-signup';

const Login = () => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(LoginSlice.selectLoginError);
  const status = useAppSelector(LoginSlice.selectLoginStatus);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Chat • Login';
  }, []);

  const onSubmit = async () => {
    if (status === 'logging') return;
    else dispatch(LoginSlice.logged({ username, password }));
  };

  return (
    <C.Base
      title="Login"
      subText="Don't have an account?"
      subLink={`${window.location.origin}/register`}
      subLinkText="Sign up"
      bgColor="login-bg"
    >
      <C.Form
        onSubmit={onSubmit}
        submitText="Login"
        submitting={status === 'logging' ? true : false}
        formError={error}
        inputError={username.length < 5 || password.length < 5}
      >
        <C.UsernameInput
          placeholder="Type in your username"
          value={username}
          setValue={setUsername}
        />
        <C.PasswordInput
          placeholder="Type in your password"
          value={password}
          setValue={setPassword}
        />
      </C.Form>
    </C.Base>
  );
};

export default Login;
