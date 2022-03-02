import classnames from 'classnames';

const Base = ({ children, bgColor }) => {
  const classStr = classnames('h-full flex items-center', bgColor);

  return <div className={classStr}>{children}</div>;
};

export default Base;
