import classnames from 'classnames';

import profilePic from '../../assets/profile-pic.jpg';
import { BsDot } from 'react-icons/bs';

const ProfilePicIcon = ({ size }) => {
  const activeIconSize = size * 1.6667;

  return (
    <div className={classnames(`w-[${size}px] h-[${size}px]`)}>
      <div className="min-w-full max-w-full relative">
        <img className="rounded-full" src={profilePic} alt="" />
        <BsDot
          size={activeIconSize}
          color="#73db46"
          className="absolute z-10 top-0"
        />
      </div>
    </div>
  );
};

export default ProfilePicIcon;
