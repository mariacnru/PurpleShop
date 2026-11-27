import { FaShoppingBasket } from 'react-icons/fa';
import { Link } from 'react-router';

export function EmptyBasket() {
  return (
    <main
      className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 py-10"
      dir="rtl"
    >
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-3xl" />

      <div className="relative w-full max-w-3xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between px-1">
          <h1 className="text-xl font-bold text-zinc-100 sm:text-2xl">سبد خرید شما</h1>

          <span className="text-sm text-zinc-500">۰ محصول</span>
        </div>

        {/* Empty Basket */}
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 text-center backdrop-blur-sm sm:p-12">
          {/* Icon */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-purple-500/20 bg-purple-500/10">
            <FaShoppingBasket className="text-4xl text-purple-400" />
          </div>

          <h2 className="mb-3 text-xl font-bold text-zinc-100">سبد خرید شما خالی است</h2>

          <p className="mb-8 max-w-md text-sm leading-7 text-zinc-500">
            هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.
            <br />
            برای مشاهده و خرید محصولات به فروشگاه سر بزنید.
          </p>

          {/* Actions */}
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/products"
              className="flex h-10 w-full items-center justify-center rounded-lg bg-purple-600 px-5 text-sm font-medium text-white transition duration-150 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 sm:w-auto"
            >
              مشاهده محصولات
            </Link>

            <Link
              to="/"
              className="flex h-10 w-full items-center justify-center rounded-lg border border-zinc-800 bg-zinc-800/50 px-5 text-sm font-medium text-zinc-300 transition duration-150 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-95 sm:w-auto"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
