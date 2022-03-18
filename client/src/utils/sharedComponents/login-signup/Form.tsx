import { Submit } from '.';
import { VscPass, VscError } from 'react-icons/vsc';

interface Props {
  children: React.ReactNode;
  inputError: boolean;
  formError: string;
  formSuccess?: string;
  submitting: boolean;
  submitText: string;
  onSubmit: () => Promise<void>;
}

const Form = ({
  children,
  inputError,
  formError,
  formSuccess,
  submitting,
  submitText,
  onSubmit,
}: Props) => {
  return (
    <form
      className="select-none relative"
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputError) onSubmit();
      }}
    >
      {formError || formSuccess || null ? (
        <p
          className={`${
            formError ? 'text-red-500' : 'text-green-500'
          } absolute  text-sm flex items-center -top-2 font-medium gap-1`}
        >
          {formError ? <VscError size={20} /> : <VscPass size={20} />}
          <span>{formError || formSuccess}</span>
        </p>
      ) : (
        ''
      )}

      {children}

      <div className="mt-10">
        <Submit
          submitText={submitText}
          submitting={submitting}
          error={inputError ? true : false}
        />
      </div>
    </form>
  );
};

export default Form;
