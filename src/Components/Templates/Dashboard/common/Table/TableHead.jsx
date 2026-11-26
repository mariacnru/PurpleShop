import clsx from "clsx";

const TableHead = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "*:h-15! *:px-3 *:py-0! rounded-t-xl **:text-xs! text-zinc-500 font-medium *:max-h-14!",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default TableHead;
