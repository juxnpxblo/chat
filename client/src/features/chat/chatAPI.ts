import api from '../../app/api';
import { Message } from './chatInterface';

export const fetchMessages = async () => {
  const res = await api.get('/chat');
  return res.data as Message[];
};
