const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://chat-juxnpxblo.herokuapp.com';

export default URL;
