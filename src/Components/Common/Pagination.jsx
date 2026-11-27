import React from 'react';

const Pagination = ({ pagination, setPage, page }) => {
  return (
    pagination &&
    pagination.totalPages > 1 && (
      <div className="flex justify-center items-center gap-2 mt-5 text-zinc-200">
        <button
          className="rounded-md bg-purple-500/10 border border-purple-400/20
             px-2.5 py-1 text-sm font-medium text-purple-400 disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          قبلی
        </button>

        <span className="text-sm">
          صفحه {pagination.page} از {pagination.totalPages}
        </span>

        <button
          className="rounded-md bg-purple-500/10 border border-purple-400/20
             px-2.5 py-1 text-sm font-medium text-purple-400 disabled:opacity-50"
          disabled={page >= pagination.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          بعدی
        </button>
      </div>
    )
  );
};

export default Pagination;
