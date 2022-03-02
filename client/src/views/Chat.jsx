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
    <div className="h-[100vh] shadow-2xl rounded-lg mx-auto border max-w-[1024px] flex flex-col scroll-smooth overflow-auto">
      <div
        ref={MessagesBoxRef}
        className="bg-white grow overflow-y-scroll flex flex-col gap-4 px-4 pt-4 pb-[4.5rem] overflow-x-hidden overflow-auto"
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
      <div className="bg-transparent relative w-full z-10">
        <Form socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
