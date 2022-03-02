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

const Login = () => {
  const [submitting, setSubmitting] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => console.log('logging in');

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
            inputError={username.length < 1 || password.length < 1}
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
