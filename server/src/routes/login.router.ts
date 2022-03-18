import { Router } from 'express';
import * as LoginController from '../controllers/login.controller';

export const loginRouter = Router();

loginRouter.get('/', LoginController.checkCredentials);
