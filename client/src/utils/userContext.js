import { createContext } from 'react';

const userContext = createContext({
  loggedUser: '',
  setLoggedUser: (username) => {},
});

export default userContext;
