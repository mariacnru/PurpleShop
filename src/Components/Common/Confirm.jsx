import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const Confirm = ({
  isOpen,
  onClose,
  onConfirm,
  title = "حذف محصول",
  message = "آیا از حذف این محصول اطمینان دارید؟ این عملیات قابل بازگشت نیست.",
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm m-0 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-purple-950/20">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-md font-semibold text-zinc-100">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            aria-label="بستن"
          >
            <FiX size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
            <FiAlertTriangle size={20} />
          </div>

          <p className="pt-1 text-sm leading-7 text-zinc-400">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            انصراف
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-medium text-red-400 transition-colors hover:border-red-500/50 hover:bg-red-500/20"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
