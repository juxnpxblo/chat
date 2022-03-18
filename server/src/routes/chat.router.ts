import { Router } from 'express';
import * as ChatController from '../controllers/chat.controller';

export const chatRouter = Router();

chatRouter.get('/', ChatController.getMessages);
