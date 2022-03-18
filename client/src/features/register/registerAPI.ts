import api from '../../app/api';
import { NewUser } from './registerInterface';

export const registerUser = async (user: NewUser) => {
  try {
    await api.post('/register', user);
    return 201;
  } catch (err: any) {
    console.error(err.message);
    if (err.response.status) return err.response.status as number;
    else return 0;
  }
};
