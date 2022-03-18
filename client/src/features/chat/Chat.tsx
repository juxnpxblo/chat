import { useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectMessages, fetchOldMessages, newMessage } from './chatSlice';
import { Message } from './chatInterface';
import * as C from './components';

const Chat = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);

  const MessagesBoxRef = useRef<HTMLDivElement>(null!);

  const socketRef = useRef<Socket>(
    io((import.meta.env.VITE_SERVER_URL as string) || '', {
      transports: ['websocket', 'polling'],
    })
  );

  useEffect(() => {
    document.title = 'Chat';
    dispatch(fetchOldMessages());
    socketRef.current.on('new message', (message: Message) =>
      dispatch(newMessage(message))
    );
  }, []);

  useEffect(() => {
    MessagesBoxRef.current.scrollTop = MessagesBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="h-[100vh] rounded-lg mx-auto max-w-[796px]">
      <div className="h-full flex flex-col mx-4 py-3 ">
        <div
          ref={MessagesBoxRef}
          className="bg-white grow rounded-t-lg overflow-y-scroll flex flex-col gap-4 p-4 overflow-x-hidden"
        >
          {messages.map(({ sender, message, date }, i) => (
            <C.Message key={i} sender={sender} message={message} date={date} />
          ))}
        </div>
        <div className="w-full h-[1px] z-20 bg-[#c0c0c0]"></div>
        <C.Form socket={socketRef.current} />
      </div>
    </div>
  );
};

export default Chat;
