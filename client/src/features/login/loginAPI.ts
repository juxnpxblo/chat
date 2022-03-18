import api from '../../app/api';

export const login = async (username: string, password: string) => {
  const res = await api.get(
    `/login/?username=${username}&password=${password}`
  );

  return res.data as { username: string } | -1 | 0 | string;
};
