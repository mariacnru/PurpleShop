import clsx from "clsx";

const Table = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "bg-zinc-900 *:p-2 rounded-xl ml-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Table;
