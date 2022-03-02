import { useState } from 'react';

import { ProfilePicIcon } from '.';

const Message = ({ self, sender, message, date }) => {
  date = new Date(date);
  return (
    <div
      className={`${
        self ? 'flex-row-reverse' : ''
      } flex items-center gap-2 mb-3`}
    >
      <div className="cursor-pointer">
        <ProfilePicIcon />
      </div>

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
          {`${date.getHours()}:${
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
          }
          ${date.getMonth() + 1}/${date.getDate()}/${date
            .getFullYear()
            .toString()
            .slice(2)}`}
        </p>
      </div>
    </div>
  );
};

export default Message;
