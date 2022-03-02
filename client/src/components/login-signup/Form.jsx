// import { useState, useEffect } from 'react';

import { Submit } from '.';

// import { VscError } from 'react-icons/vsc';

const Form = ({
  children,
  onSubmit,
  submitText,
  inputError,
  errorCheck,
  submitting,
}) => {
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   setError(errorCheck());
  // }, [errorCheck]);

  return (
    <form
      className="select-none relative"
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputError) onSubmit();
      }}
    >
      {/* {error ? (
        <p className="absolute text-red-500 text-sm flex items-center -top-2 font-medium gap-1">
          <VscError size={20} />
          <span>
            {error}
            This username is already registered. The username or password is
            incorrect.
          </span>
        </p>
      ) : (
        ''
      )} */}
      {children}
      <div className="mt-14">
        <Submit
          onSubmit={onSubmit}
          submitText={submitText}
          submitting={submitting}
          error={inputError ? true : false}
        />
      </div>
    </form>
  );
};

export default Form;
