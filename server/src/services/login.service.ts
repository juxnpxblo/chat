import { useQuery } from '../config/database/db';
import * as LoginInterface from '../interfaces/login.interface';

export const checkCredentials = async (username: string, password: string) => {
  const res = await useQuery<[LoginInterface.CaseTrueOrFalse] | []>(
    'SELECT CASE WHEN password=$1 THEN true ELSE false END FROM users WHERE username = $2',
    [password, username]
  );
  return !res[0] ? -1 : res[0].case ? { username } : 0;
};
