import classnames from 'classnames';

import { RoundedWhiteBox, Title, Subtitle } from '.';

const Base = ({ children, title, subText, subLink, subLinkText, bgColor }) => {
  const classStr = classnames('h-full flex items-center', bgColor);

  return (
    <div className={classStr}>
      <div className="w-[380px] mx-auto">
        <RoundedWhiteBox>
          <div className="mb-1">
            <Title text={title} />
          </div>
          <div className="mb-4">
            <Subtitle text={subText} link={subLink} linkText={subLinkText} />
          </div>
          {children}
        </RoundedWhiteBox>
      </div>
    </div>
  );
};

export default Base;
