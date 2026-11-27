import React, { useEffect } from 'react';
import { TbShoppingBag, TbHeart, TbStarFilled } from 'react-icons/tb';
import { formatPrice } from './../../../../lib/helpers/price';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
  const sellerPrice = product?.sellers?.[0]?.price;

  return (
    <Link
      to={`/product/${product?.slug}`}
      className="group relative block w-full h-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300"
    >
      {/* Discount */}
      {product?.discount > 0 && (
        <span className="absolute top-3 right-3 z-10 bg-purple-500/15 text-purple-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-purple-500/20">
          {product.discount}٪ تخفیف
        </span>
      )}

      {/* Favorite */}
      <button
        type="button"
        aria-label="افزودن به علاقه‌مندی‌ها"
        onClick={(e) => e.preventDefault()}
        className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-zinc-950/70 text-zinc-400 flex items-center justify-center hover:text-purple-400 transition-colors"
      >
        <TbHeart size={17} />
      </button>

      {/* Image */}
      <div className="h-44 bg-zinc-950/60 p-4 flex items-center justify-center overflow-hidden">
        <img
          src={`https://shopino.pachim.run/images/products/${product?.images[0]}`}
          alt={product?.name || 'محصول'}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 text-purple-400 mb-2">
          <TbStarFilled size={13} />

          <span className="text-xs font-medium">{product?.averageRating || 0}</span>

          <span className="text-xs text-zinc-600">({product?.commentCount || 0} نظر)</span>
        </div>

        {/* Title */}
        <h3 className="text-sm text-zinc-200 font-medium leading-6 line-clamp-2 min-h-12 group-hover:text-purple-300 transition-colors">
          {product?.name}
        </h3>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-white truncate">
                {sellerPrice != null ? formatPrice(sellerPrice) : 'نامشخص'}
              </span>

              <span className="text-[10px] text-zinc-500 shrink-0">تومان</span>
            </div>

            <span className="text-xs text-zinc-500">
              {product?.stock > 0 ? `${product.stock} عدد موجود` : 'ناموجود'}
            </span>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            aria-label="افزودن به سبد خرید"
            disabled={product?.stock === 0}
            onClick={(e) => e.preventDefault()}
            className="w-9 h-9 shrink-0 rounded-xl bg-purple-600 text-white flex items-center justify-center hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <TbShoppingBag size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
