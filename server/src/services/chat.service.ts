import { useQuery } from '../config/database/db';
import * as ChatInterface from '../interfaces/chat.interface';

export const getMessages = async () =>
  await useQuery<ChatInterface.Message[]>(
    'SELECT message, sender, date FROM messages'
  );

export const postMessage = async (message: string, sender: string) => {
  const res = await useQuery<[ChatInterface.Message]>(
    'INSERT INTO messages (message, sender, date) VALUES ($1, $2, now()) RETURNING message, sender, date',
    [message, sender]
  );
  return res[0];
};
