import React from 'react';
import { useEffect, useState } from 'react';

const Input = React.forwardRef(
  ({ title, icon, type, state, placeholder, setState, error }, ref) => {
    return (
      <label>
        <p className="text-sm font-medium mb-3 pt-6">{title}</p>{' '}
        <div className="input flex items-center gap-2.5 pl-1 mb-3">
          {icon}
          <input
            type={type}
            value={state}
            ref={ref}
            placeholder={placeholder}
            className="outline-none w-full"
            spellCheck="false"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="">
          <div
            className={`${
              error && state ? 'bg-red-500' : 'bg-[#262626]'
            } absolute h-[1px] w-[282px] mr-3`}
          ></div>
        </div>
        {error && state ? (
          <p className=" text-red-500 text-[11px] pt-1 absolute">{error}</p>
        ) : (
          ''
        )}
      </label>
    );
  }
);

export default Input;
