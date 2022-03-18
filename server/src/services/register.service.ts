import { useQuery } from '../config/database/db';
import * as RegisterInterface from '../interfaces/register.interface';

export const registerUser = async ({
  username,
  password,
}: RegisterInterface.NewUser) => {
  try {
    await useQuery('INSERT INTO users (username, password) VALUES ($1, $2)', [
      username,
      password,
    ]);
    return 1;
  } catch (err) {
    if (RegisterInterface.hasCode(err)) {
      return parseInt(err.code);
    } else {
      return 0;
    }
  }
};
