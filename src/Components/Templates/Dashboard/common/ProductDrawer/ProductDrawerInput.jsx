import React from "react";
import { FiUploadCloud } from "react-icons/fi";

const ProductDrawerInput = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  const id = crypto.randomUUID();

  return (
    <div className="flex flex-col gap-2 mt-2">
      <label
        htmlFor={`unique-input-${id}`}
        className="text-sm font-medium text-zinc-300"
      >
        {label}:
      </label>

      <input
        id={`unique-input-${id}`}
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none placeholder:text-zinc-600 transition-colors focus:border-purple-600 focus:ring-1 focus:ring-purple-600/20"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ProductDrawerInput;
