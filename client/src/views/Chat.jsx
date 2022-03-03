import { useState, useRef, useEffect } from 'react';

import api from '../api/api';

import { Message, Form } from '../components/chat/';

const Chat = ({ loggedUser, socket }) => {
  const [messages, setMessages] = useState([]);

  const MessagesBoxRef = useRef(null);

  useEffect(() => {
    (async () => {
      setMessages((await api.get('/chat')).data);
      scroll();
    })();

    socket.on('new message', ({ sender, message, date }) => {
      setMessages((messages) => [...messages, { sender, message, date }]);
      scroll();
    });
  }, [socket]);

  const scroll = () =>
    (MessagesBoxRef.current.scrollTop = MessagesBoxRef.current.scrollHeight);

  return (
    <div className="h-[100vh] rounded-lg mx-auto max-w-[796px]">
      <div className="h-full flex flex-col mx-4 py-3 ">
        <div
          ref={MessagesBoxRef}
          className="bg-white grow rounded-t-lg overflow-y-scroll flex flex-col gap-4 p-4 overflow-x-hidden"
        >
          {messages.map(
            ({ sender, self = sender === loggedUser, message, date }, i) => (
              <Message
                key={i}
                self={self}
                sender={sender}
                message={message}
                date={date}
              />
            )
          )}
        </div>
        <div className="w-full h-[1px] z-20 bg-[#c0c0c0]"></div>
        <Form socket={socket} loggedUser={loggedUser} />
      </div>
    </div>
  );
};

export default Chat;
