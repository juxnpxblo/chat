import api from '../api/api';

import { useState, useRef, useEffect } from 'react';

import { Message } from '../components/chat/';

import { RiSendPlaneFill } from 'react-icons/ri';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const MessagesBoxRef = useRef(null);

  const fetchMessages = async () => {
    const res = await api.get('/chat');
    setMessages(res.data);
    MessagesBoxRef.current.scrollTop = MessagesBoxRef.current.scrollHeight;
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="h-[100vh] flex">
      <div className="grow h-full flex flex-col">
        <div
          ref={MessagesBoxRef}
          className="bg-white grow overflow-y-scroll flex flex-col gap-4 px-2 pt-4 pb-16"
        >
          {messages.map(({ sender, message, date }, i) => (
            <Message key={i} sender={sender} message={message} date={date} />
          ))}
        </div>
        <div className="bg-transparent relative w-full z-10">
          <form
            className=" flex absolute bottom-0 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grow pl-4 pr-16 pb-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full outline-none border rounded-lg p-2.5 focus:border-[#262626]"
              />
            </div>
            <label>
              <input type="submit" value=" " className="" />
              <RiSendPlaneFill
                size={28}
                color="#146aff"
                className="absolute top-2 right-8 cursor-pointer"
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
