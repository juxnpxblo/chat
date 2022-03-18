import { Input } from '.';
import { MdOutlinePersonOutline } from 'react-icons/md';

interface Props {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
}

const UsernameInput = ({ placeholder, value, setValue, error }: Props) => {
  return (
    <Input
      type={'text'}
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
