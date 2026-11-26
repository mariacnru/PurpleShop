const Content = ({ text }) => {
  return (
    <div className="tracking-wide leading-7 text-zinc-800 text-justify">
      {text || "درحال بارگذاری..."}
    </div>
  );
};

export default Content;
