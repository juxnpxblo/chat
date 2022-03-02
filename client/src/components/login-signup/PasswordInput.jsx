import { useState, useRef } from 'react';

import classNames from 'classnames';

import { Input } from '.';
import { MdLockOutline } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const PasswordInput = ({ placeholder, state, setState, error }) => {
  const [showingPassw, setShowingPassw] = useState(false);

  const inputPasswRef = useRef(null);

  const iconClass = classNames(
    'cursor-pointer absolute bottom-0 right-2 invisible' +
      (state ? 'visible' : '')
  );

  return (
    <div className="relative">
      <Input
        type={showingPassw ? 'text' : 'password'}
        title="Password"
        placeholder={placeholder}
        icon={<MdLockOutline className="input-icon" size={20} />}
        ref={inputPasswRef}
        state={state}
        setState={setState}
        error={error}
      />
      {showingPassw ? (
        <IoMdEyeOff
          size={20}
          className={iconClass}
          onClick={() => setShowingPassw(!showingPassw)}
        />
      ) : (
        <IoMdEye
          size={20}
          className={iconClass}
          onClick={() => setShowingPassw(!showingPassw)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
