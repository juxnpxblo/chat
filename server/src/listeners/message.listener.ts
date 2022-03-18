import { Server, Socket } from 'socket.io';
import { postMessage } from '../services/chat.service';
import { NewMessageBody } from '../interfaces/chat.interface';

const onMessage = (io: Server, socket: Socket) => {
  socket.on('message', async ({ message, sender }: NewMessageBody) => {
    try {
      const newMessage = await postMessage(message, sender);
      io.emit('new message', newMessage);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  });
};

export default onMessage;
