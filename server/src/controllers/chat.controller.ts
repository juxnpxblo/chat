import { Request, Response } from 'express';
import * as ChatService from '../services/chat.service';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await ChatService.getMessages();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      console.error(err.message);
      res.send(err.message);
    }
  }
};
