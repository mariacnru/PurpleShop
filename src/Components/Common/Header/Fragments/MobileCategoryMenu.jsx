
import React, { useState } from "react";
import useCategories from "../../../../lib/Hooks/useCategories";
import {
  TbCategory,
  TbChevronLeft,
  TbChevronRight,
  TbX,
} from "react-icons/tb";
import { Link } from "react-router";

const MobileCategoryMenu = () => {
  const { categories = [], isLoading } = useCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState([]);

  // Current categories based on navigation level
  const currentCategories = path.length
    ? path[path.length - 1].subCategories || []
    : categories;

  // Current title
  const currentTitle = path.length
    ? path[path.length - 1].title
    : "دسته‌بندی محصولات";

  // Navigate into subcategories
  const handleNavigate = (category) => {
    setPath((prev) => [...prev, category]);
  };

  // Navigate back
  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
  };

  // Close menu
  const handleClose = () => {
    setIsOpen(false);
    setPath([]);
  };

  // Build category URL
  const getCategoryUrl = (category) => {
    const slugs = [...path, category]
      .map((item) => item.slug)
      .join("/");

    return `/category/${slugs}`;
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-category-menu"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-purple-400"
      >
        {isOpen ? <TbX size={20} /> : <TbCategory size={20} />}

        <span>دسته‌بندی کالاها</span>
      </button>

      {/* Menu */}
      <div
        id="mobile-category-menu"
        className={`absolute right-0 top-full z-50 mt-3 w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40 transition-all duration-300 ease-out ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div className="flex items-center gap-2 min-w-0">

            {path.length > 0 && (
              <button
                type="button"
                onClick={handleBack}
                aria-label="بازگشت به دسته‌بندی قبلی"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 transition-colors hover:bg-purple-500/10 hover:text-purple-400"
              >
                <TbChevronRight size={20} />
              </button>
            )}

            <div className="min-w-0">
              <span className="text-[10px] font-medium tracking-wider text-purple-400">
                EXPLORE CATEGORIES
              </span>

              <h3 className="truncate text-sm font-bold text-white">
                {currentTitle}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="بستن منو"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <TbX size={20} />
          </button>
        </div>

        {/* Breadcrumb */}
        {path.length > 0 && (
          <div className="flex items-center gap-1 overflow-x-auto border-b border-zinc-800/70 px-4 py-3 text-xs text-zinc-500">
            <button
              type="button"
              onClick={() => setPath([])}
              className="shrink-0 transition-colors hover:text-purple-400"
            >
              همه دسته‌ها
            </button>

            {path.map((item, index) => (
              <React.Fragment key={item._id}>
                <TbChevronLeft className="shrink-0" />

                <button
                  type="button"
                  onClick={() =>
                    setPath((prev) => prev.slice(0, index + 1))
                  }
                  className={`shrink-0 transition-colors ${
                    index === path.length - 1
                      ? "text-purple-400"
                      : "hover:text-purple-400"
                  }`}
                >
                  {item.title}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Categories */}
        <div className="max-h-[60dvh] min-h-40 overflow-y-auto p-3 custom-scrollbar">

          {isLoading ? (
            <div className="space-y-3 p-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-12 animate-pulse rounded-lg bg-zinc-800"
                />
              ))}
            </div>
          ) : currentCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <TbCategory size={30} className="text-zinc-600" />

              <p className="text-sm text-zinc-400">
                زیر دسته‌بندی‌ای یافت نشد
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {currentCategories.map((category) => {
                const hasChildren =
                  category.subCategories?.length > 0;

                return (
                  <div key={category._id}>
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => handleNavigate(category)}
                        className="group flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-right transition-colors duration-200 hover:bg-purple-500/10"
                      >
                        <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-purple-400">
                          {category.title}
                        </span>

                        <TbChevronLeft
                          size={19}
                          className="shrink-0 text-zinc-600 transition-all duration-200 group-hover:-translate-x-1 group-hover:text-purple-400"
                        />
                      </button>
                    ) : (
                      <Link
                        to={getCategoryUrl(category)}
                        onClick={handleClose}
                        className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 transition-colors duration-200 hover:bg-purple-500/10"
                      >
                        <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-purple-400">
                          {category.title}
                        </span>

                        <TbChevronLeft
                          size={19}
                          className="shrink-0 text-zinc-600 transition-colors group-hover:text-purple-400"
                        />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 bg-zinc-900/60 px-4 py-3">
          <p className="text-center text-xs text-zinc-500">
            محصولات مورد نظرت رو از دسته‌بندی‌ها پیدا کن
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileCategoryMenu;

