import { useState, useRef } from 'react';

import classNames from 'classnames';

import { Input } from '.';

import { MdLockOutline } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const PasswordInput = ({ placeholder, value, setValue, error }) => {
  const [showingPassw, setShowingPassw] = useState(false);

  const inputPasswRef = useRef(null);

  const iconClass = classNames(
    'cursor-pointer absolute bottom-0 right-2 invisible' +
      (value ? 'visible' : '')
  );

  const switchShowingPassw = () => setShowingPassw(!showingPassw);

  return (
    <div className="relative">
      <Input
        type={showingPassw ? 'text' : 'password'}
        value={value}
        setValue={setValue}
        title="Password"
        placeholder={placeholder}
        icon={<MdLockOutline className="input-icon" size={20} />}
        error={error}
        ref={inputPasswRef}
      />
      {showingPassw && value ? (
        <IoMdEyeOff
          size={20}
          className={iconClass}
          onClick={switchShowingPassw}
        />
      ) : (
        <IoMdEye size={20} className={iconClass} onClick={switchShowingPassw} />
      )}
    </div>
  );
};

export default PasswordInput;
