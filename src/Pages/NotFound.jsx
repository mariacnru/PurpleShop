import { TbError404 } from 'react-icons/tb';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 text-white"
      dir="rtl"
    >
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-3xl" />

      <div className="relative w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10">
          <TbError404 className="text-6xl text-purple-400" />
        </div>

        {/* Error Code */}
        <p className="mb-2 text-sm font-medium tracking-[0.3em] text-purple-400">خطای ۴۰۴</p>

        <h1 className="mb-4 text-3xl font-bold text-zinc-100 sm:text-4xl">صفحه پیدا نشد</h1>

        <p className="mx-auto mb-8 max-w-sm text-sm leading-7 text-zinc-500">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است آدرس آن تغییر کرده باشد.
        </p>

        {/* Action */}
        <Link
          to="/"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-purple-600 px-6 text-sm font-medium text-white transition duration-150 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
