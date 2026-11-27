import React from 'react';
import { CgClose } from 'react-icons/cg';

const ModalIndex = ({ children, title, onClose, onSubmit, pending }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-purple-500/20 bg-zinc-900 shadow-2xl shadow-purple-950/30">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="text-sm text-zinc-200">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-red-400"
          >
            <CgClose />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-3 border-t border-zinc-800 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-300"
          >
            انصراف
          </button>
          <button
            onClick={onSubmit}
            disabled={pending}
            className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 transition-all hover:border-purple-500/50 hover:bg-purple-500/20 hover:text-purple-300"
          >
            {pending ? 'درحال ثبت...' : 'تایید'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalIndex;
