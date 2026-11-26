import clsx from "clsx";

const TableToolbar = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "className min-h-16 px-10! border-b border-zinc-800",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default TableToolbar;
