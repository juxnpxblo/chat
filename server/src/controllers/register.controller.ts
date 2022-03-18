import { Request, Response } from 'express';
import * as RegisterService from '../services/register.service';
import * as RegisterInterface from '../interfaces/register.interface';

export const registerUser = async (req: Request, res: Response) => {
  const user: RegisterInterface.NewUser = req.body;

  const result = await RegisterService.registerUser(user);

  if (result === 1) res.status(201);
  else if (result === 23505) res.status(409);
  else res.status(500);

  res.end();
};
