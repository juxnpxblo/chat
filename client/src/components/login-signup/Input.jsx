import React from 'react';

const Input = React.forwardRef(
  ({ type, value, setValue, title, placeholder, icon, error }, ref) => {
    return (
      <label>
        <p className="text-sm font-medium mb-3 pt-6">{title}</p>{' '}
        <div className="input flex items-center gap-2.5 pl-1 mb-3">
          {icon}
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            spellCheck="false"
            className="outline-none w-full"
            ref={ref}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <div
            className={`${
              error && value ? 'bg-red-500' : 'bg-[#262626]'
            } absolute h-[1px] w-full mr-3`}
          ></div>
        </div>
        {error && value ? (
          <p className=" text-red-500 text-[11px] pt-1 absolute">{error}</p>
        ) : (
          ''
        )}
      </label>
    );
  }
);

export default Input;
