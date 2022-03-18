import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectLoggedUser } from '../../login/loginSlice';
import { Socket } from 'socket.io-client';
import { RiSendPlaneFill } from 'react-icons/ri';

const Form = ({ socket }: { socket: Socket }) => {
  const loggedUser = useAppSelector(selectLoggedUser);
  const [newMessage, setNewMessage] = useState('');

  return (
    <form
      className="flex gap-2 items-center justify-center relative"
      onSubmit={(e) => {
        e.preventDefault();
        if (newMessage.length > 160 || !newMessage) return;
        setNewMessage('');
        socket.emit('message', { message: newMessage, sender: loggedUser });
      }}
    >
      <div className="grow">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          maxLength={160}
          placeholder="Type your message..."
          className="w-full outline-none border rounded-b-lg p-2.5 pr-[2.9rem]"
        />
      </div>
      <label className="absolute right-1.5 bottom-1.5">
        <input type="submit" value=" " />
        <div
          className={`${
            newMessage ? 'bg-[#146aff]' : 'bg-[#87b3ff]'
          } w-[34px] h-[34px] transition-colors border-2 flex items-center justify-center top-0 rounded-md cursor-pointer`}
        >
          <div>
            <RiSendPlaneFill size={20} color="white" />
          </div>
        </div>
      </label>
    </form>
  );
};

export default Form;
