import { Input } from '.';
import { MdOutlinePersonOutline } from 'react-icons/md';

const UsernameInput = ({ placeholder, state, setState, error }) => {
  return (
    <Input
      type="text"
      title="Username"
      placeholder={placeholder}
      icon={<MdOutlinePersonOutline className="input-icon" size={20} />}
      state={state}
      setState={setState}
      error={error}
    />
  );
};

export default UsernameInput;
