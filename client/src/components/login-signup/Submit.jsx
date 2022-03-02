import { MdOutlineArrowForward } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';

const Submit = ({ error, submitText, submitting }) => {
  return (
    <div className="relative text-white flex items-center justify-center">
      {submitting && (
        <AiOutlineLoading size={24} className="absolute rotate-forever" />
      )}
      <input
        type="submit"
        value={submitting ? ' ' : submitText}
        className={`${
          error ? 'bg-sky-200' : 'bg-sky-400 hover:bg-sky-500 cursor-pointer'
        } w-full transition-colors rounded-xl font-medium text-lg py-2`}
      />
      {!submitting && (
        <MdOutlineArrowForward
          size={24}
          className={`${
            !error ? 'cursor-pointer' : ''
          } absolute top-1/4 right-2`}
        />
      )}
    </div>
  );
};

export default Submit;
