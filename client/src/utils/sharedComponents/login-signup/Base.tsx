import classnames from 'classnames';
import { RoundedWhiteBox, Title, Subtitle } from '.';

interface Props {
  children: React.ReactNode;
  title: string;
  subText: string;
  subLink: string;
  subLinkText: string;
  bgColor: string;
}

const Base = ({
  children,
  title,
  subText,
  subLink,
  subLinkText,
  bgColor,
}: Props) => {
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
