import { Router } from 'express';
import * as RegisterController from '../controllers/register.controller';

export const registerRouter = Router();

registerRouter.post('/', RegisterController.registerUser);
