import { useState } from 'react';

import { ProfilePicIcon } from '.';

const Message = ({ self, sender, message, date }) => {
  date = new Date(date);
  self = false;

  return (
    <div
      className={`${
        self ? 'flex-row-reverse' : ''
      } flex items-center gap-2 mb-3`}
    >
      {!self && (
        <div className="cursor-pointer">
          <ProfilePicIcon size={32} />
        </div>
      )}

      <div className={`${self ? 'flex-col items-end' : ''} grow relative flex`}>
        <div
          className={`${
            self ? 'bg-sky-400 text-white' : 'bg-zinc-100'
          } max-w-[65%] rounded-md text-sm px-3 py-2`}
        >
          <p>
            {!self && (
              <span className="font-semibold select-none cursor-pointer">
                {sender}
              </span>
            )}{' '}
            {message}
          </p>
        </div>
        <p
          className={`${
            self ? 'right-1' : 'left-1'
          } absolute -bottom-[18px] select-none text-[11px] font-light pt-1 w-fit self-end`}
        >
          {`${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`}
        </p>
      </div>
    </div>
  );
};

export default Message;
