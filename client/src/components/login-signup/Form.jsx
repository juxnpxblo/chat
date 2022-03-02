import { Submit } from '.';

import { VscError, VscPass } from 'react-icons/vsc';

const Form = ({
  children,
  onSubmit,
  submitText,
  inputError,
  formError,
  formSuccess,
  submitting,
}) => {
  return (
    <form
      className="select-none relative"
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputError) onSubmit();
      }}
    >
      {formError ? (
        <p className="absolute text-red-500 text-sm flex items-center -top-2 font-medium gap-1">
          <VscError size={20} />
          <span>
            {formError}
            {/* This username is already registered. The username or password is
            incorrect. */}
          </span>
        </p>
      ) : (
        ''
      )}
      {formSuccess ? (
        <p className="absolute text-green-500 text-sm flex items-center -top-2 font-medium gap-1">
          <VscPass size={20} />
          <span>{formSuccess}</span>
        </p>
      ) : (
        ''
      )}
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
