import React from "react";
import { HiX } from "react-icons/hi";
import useProductForm from "../../../../../lib/Hooks/useProductForm";

const Drawer = ({ children, title, className, isOpen = false, onClose }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 transition-opacity duration-500 bg-black/30 ${isOpen ? "opacity-100" : "opacity-0 invisible"}`}
    >
      <div
        className={`absolute inset-y-0 overflow-auto right-0 w-full max-w-md bg-zinc-900 transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <p className="font-medium">{title}</p>
          <button onClick={onClose} className="text-zinc-600">
            <HiX className="size-6" />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
