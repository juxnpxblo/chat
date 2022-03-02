import { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

const Form = ({ socket }) => {
  const [newMessage, setNewMessage] = useState('');

  return (
    <form
      className="flex absolute bottom-0 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (newMessage.length > 160 || !newMessage) return;
        setNewMessage('');
        socket.emit('new message', newMessage);
      }}
    >
      <div className="grow pl-4 pr-14 pb-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          maxLength={160}
          placeholder="Type your message..."
          className="w-full outline-none border rounded-lg p-2.5 focus:border-[#262626] input-shadow"
        />
      </div>
      <label>
        <input type="submit" value=" " className="" />
        <div
          className={`${
            newMessage ? 'bg-[#146aff]' : 'bg-[#a5c6ff]'
          } transition-colors justify-center w-[36px] h-[36px] rounded-md absolute top-1.5 right-4 cursor-pointer`}
        >
          <div className="w-full h-full flex items-center input-shadow rounded-md">
            <RiSendPlaneFill
              size={24}
              color="white"
              className="absolute left-[5px] bottom-[6px]"
            />
          </div>
        </div>
      </label>
    </form>
  );
};

export default Form;
