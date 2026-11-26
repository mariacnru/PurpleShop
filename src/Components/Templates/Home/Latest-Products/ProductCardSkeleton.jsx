
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="relative w-full h-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden animate-pulse">

      {/* Discount */}
      <div className="absolute top-3 right-3 z-10 w-20 h-6 rounded-lg bg-zinc-800" />

      {/* Favorite */}
      <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-zinc-800" />

      {/* Image */}
      <div className="h-44 bg-zinc-950/60 p-4 flex items-center justify-center">
        <div className="w-32 h-32 rounded-xl bg-zinc-800" />
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
          <div className="w-8 h-3 rounded bg-zinc-800" />
          <div className="w-16 h-3 rounded bg-zinc-800" />
        </div>

        {/* Title */}
        <div className="space-y-2 min-h-12">
          <div className="w-full h-3 rounded bg-zinc-800" />
          <div className="w-2/3 h-3 rounded bg-zinc-800" />
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="w-28 h-5 rounded bg-zinc-800" />
            <div className="w-20 h-3 rounded bg-zinc-800" />
          </div>

          {/* Add to Cart */}
          <div className="w-9 h-9 shrink-0 rounded-xl bg-zinc-800" />
        </div>

      </div>
    </div>
  );
};

export default ProductCardSkeleton;
