import classnames from 'classnames';

import profilePic from '../../assets/profile-pic.jpg';
import { BsDot } from 'react-icons/bs';

const ProfilePicIcon = () => {
  return (
    <div className={classnames(`w-[32px] h-[32px] select-none`)}>
      <div className="min-w-full max-w-full relative">
        <img className="rounded-full" src={profilePic} alt="" />
        <BsDot size={53} color="#73db46" className="absolute z-10 top-0" />
      </div>
    </div>
  );
};

export default ProfilePicIcon;
