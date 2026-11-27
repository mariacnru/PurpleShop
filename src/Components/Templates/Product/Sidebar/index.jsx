import React from 'react';
import {
  TbShoppingCart,
  TbHeadset,
  TbShieldCheck,
  TbTruckDelivery,
  TbInfoCircle,
} from 'react-icons/tb';

const Sidebar = ({ name, images, sellers }) => {
  return (
    <aside className="sticky top-5 col-span-2 h-max w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-lg shadow-purple-950/10 space-y-4">
      {/* Product */}
      <div className="flex items-center gap-3">
        <div className="size-14 shrink-0 rounded-lg bg-zinc-900 p-1">
          <img
            src={`https://shopino.pachim.run/images/products/${images[0]}`}
            alt="Product"
            className="size-full object-contain"
          />
        </div>

        <div className="min-w-0">
          <span className="text-[11px] text-purple-400">محصول انتخابی</span>
          <h3 className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-zinc-200">
            {name}{' '}
          </h3>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-purple-500/5 p-2.5">
        <TbInfoCircle className="size-4 shrink-0 text-purple-400" />
        <p className="text-[11px] leading-5 text-zinc-400">
          قبل از ثبت سفارش، مشخصات محصول را بررسی کنید.
        </p>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
        <span className="text-xs font-medium text-zinc-300">قیمت نهایی</span>
        <div className="text-left">
          <span className="text-base font-bold text-purple-400">
            {sellers?.[0]?.price?.toLocaleString('fa-IR') ?? 'نامشخص'}
          </span>{' '}
          <span className="mr-1 text-[10px] text-zinc-500">تومان</span>
        </div>
      </div>

      {/* Add to Cart */}
      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 py-3 text-xs font-semibold text-white transition hover:bg-purple-500 active:scale-[0.98]">
        <TbShoppingCart className="size-4" />
        افزودن به سبد خرید
      </button>

      {/* Services */}
      <div className="space-y-3 border-t border-zinc-800 pt-3">
        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <TbShieldCheck className="size-4 text-purple-400" />
          ضمانت اصالت کالا
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <TbTruckDelivery className="size-4 text-purple-400" />
          ارسال سریع سفارش
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <TbHeadset className="size-4 text-purple-400" />
          پشتیبانی و مشاوره خرید
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
