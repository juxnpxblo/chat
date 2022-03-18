import { Request, Response } from 'express';
import * as LoginService from '../services/login.service';

export const checkCredentials = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.query;

    if (typeof username === 'string' && typeof password === 'string') {
      const result = await LoginService.checkCredentials(username, password);
      res.status(200).json(result);
    } else {
      throw new Error('missing or malformed input');
    }
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      console.error(err.message);
      res.send(err.message);
    }
  }
};
