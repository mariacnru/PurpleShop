import React from 'react';
import { Link } from 'react-router';
import { TbLockAccess } from 'react-icons/tb';

const Forbidden = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 text-white">
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-3xl" />

      <div className="relative w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10">
          <TbLockAccess className="text-4xl text-purple-400" />
        </div>

        {/* Error Code */}
        <p className="mb-2 text-sm font-medium tracking-[0.3em] text-purple-400">خطای ۴۰۳</p>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">دسترسی غیرمجاز</h1>

        <p className="mb-8 text-sm leading-7 text-zinc-400">
          شما اجازه دسترسی به این صفحه را ندارید.
          <br />
          اگر فکر می‌کنید این یک اشتباه است، با مدیر سیستم
          <br />
          <Link to={'contact-us'} className="text-purple-500 underline">
            تماس بگیرید
          </Link>
          .
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-medium transition hover:bg-purple-500 active:scale-95"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
};

export default Forbidden;
