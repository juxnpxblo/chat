const Subtitle = ({ text, link, linkText }) => {
  return (
    <p className="font-light text-xs">
      {text}{' '}
      <a
        href={link}
        className="text-sky-500 font-medium hover:text-sky-600 transition-colors"
      >
        {linkText}
      </a>
    </p>
  );
};

export default Subtitle;
