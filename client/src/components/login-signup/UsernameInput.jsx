import { Input } from '.';
import { MdOutlinePersonOutline } from 'react-icons/md';

const UsernameInput = ({ placeholder, value, setValue, error }) => {
  return (
    <Input
      type="text"
      value={value}
      setValue={setValue}
      title="Username"
      placeholder={placeholder}
      icon={<MdOutlinePersonOutline className="input-icon" size={20} />}
      error={error}
    />
  );
};

export default UsernameInput;
