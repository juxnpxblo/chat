const RoundedWhiteBox = ({ children }) => {
  return (
    <div className="w-full bg-white flex flex-col items-center rounded-2xl shadow-xl py-8">
      {children}
    </div>
  );
};

export default RoundedWhiteBox;
