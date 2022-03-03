import api from '../api/api';

import { useState, useRef, useEffect } from 'react';

import { Message, Form } from '../components/chat/';

import { useContext } from 'react';
import userContext from '../utils/userContext';

const dates = [];

const Chat = ({ socket }) => {
  const [printDate, setPrintDate] = useState(false);

  const { loggedUser } = useContext(userContext);

  const [messages, setMessages] = useState([]);

  const MessagesBoxRef = useRef(null);

  const scroll = () =>
    (MessagesBoxRef.current.scrollTop = MessagesBoxRef.current.scrollHeight);

  useEffect(() => {
    (async () => {
      const res = await api.get('/chat');
      setMessages(res.data);
      scroll();
    })();

    socket.on('new message', ({ sender, message, date }) => {
      setMessages((messages) => [...messages, { sender, message, date }]);
      scroll();
    });
  }, [socket]);

  return (
    <div className="h-[100vh] rounded-lg mx-auto max-w-[796px]">
      <div className="h-full flex flex-col gap-2 mx-4 py-3">
        <div
          ref={MessagesBoxRef}
          className="bg-white rounded-lg overflow-y-scroll flex flex-col gap-4 p-4 overflow-x-hidden"
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
        <Form socket={socket} loggedUser={loggedUser} />
      </div>
    </div>
  );
};

export default Chat;
