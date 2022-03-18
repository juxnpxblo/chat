import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import * as listeners from './listeners';
import * as routes from './routes';

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  transports: ['websocket', 'polling'],
});

io.on('connection', (socket) => {
  listeners.onMessage(io, socket);
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/login', routes.loginRouter);
app.use('/api/register', routes.registerRouter);
app.use('/api/chat', routes.chatRouter);

if (!!process.env.DYNO) {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')));

  app.get('*', function (req: Request, res: Response) {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
  });
}

httpServer.listen(process.env.PORT);
