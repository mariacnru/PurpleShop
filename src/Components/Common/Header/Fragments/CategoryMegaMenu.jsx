import React, { useEffect, useState } from 'react';
import useCategories from './../../../../lib/Hooks/useCategories';
import { TbCategory, TbChevronLeft } from 'react-icons/tb';
import { Link } from 'react-router';

const CategoryMegaMenu = () => {
  const { categories, isLoading } = useCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (categories.length && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const handleClose = () => setIsOpen(false);

  const handleOpen = () => {
    setIsOpen(true);

    if (categories.length && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  };

  return (
    <div
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className="relative h-full flex justify-center items-center"
    >
           {' '}
      <button className="group flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-purple-400 transition-colors duration-200">
               {' '}
        <TbCategory
          size={19}
          className="text-purple-400 group-hover:scale-110 transition-transform"
        />
                <span>دسته بندی کالاها</span>     {' '}
      </button>
           {' '}
      {isOpen && !isLoading && categories.length > 0 && (
        <div className="fixed top-full z-50 w-[75dvw] right-0 mx-2">
                   {' '}
          <div className="flex bg-zinc-900 text-zinc-200 border border-zinc-700/70 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* right - Main Categories */}           {' '}
            <div className="bg-zinc-950/90 w-60 max-h-[70vh] overflow-y-auto shrink-0 p-5 border-l border-zinc-800 custom-scrollbar">
                           {' '}
              <div className="mb-5">
                               {' '}
                <span className="text-xs text-zinc-500 font-medium">
                                    BROWSE CATEGORIES                {' '}
                </span>
                               {' '}
                <h3 className="text-base font-bold text-white mt-2">
                                    دسته‌بندی محصولات                {' '}
                </h3>
                             {' '}
              </div>
                           {' '}
              <ul className="space-y-1.5">
                               {' '}
                {categories.map((category) => (
                  <li
                    key={category._id}
                    onMouseEnter={() => setActiveCategory(category)}
                    className={`group rounded-lg transition-all duration-200 cursor-pointer ${
                      activeCategory?._id === category._id
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'text-zinc-400 hover:bg-zinc-800/70 hover:text-white'
                    }`}
                  >
                                       {' '}
                    <Link
                      to={`category/${category.slug}`}
                      onClick={(e) => e.preventDefault()}
                      className="flex items-center justify-between gap-3 px-3 py-3"
                    >
                                           {' '}
                      <span className="text-sm font-medium">
                                                {category.title}                     {' '}
                      </span>
                                           {' '}
                      <TbChevronLeft
                        size={16}
                        className={`shrink-0 transition-transform duration-200 ${
                          activeCategory?._id === category._id
                            ? 'text-purple-400 -translate-x-1'
                            : 'text-zinc-600 group-hover:text-zinc-300'
                        }`}
                      />
                                         {' '}
                    </Link>
                                     {' '}
                  </li>
                ))}
                             {' '}
              </ul>
                         {' '}
            </div>
                        {/* left - Sub Categories */}           {' '}
            <div className="flex-1 p-7 min-h-72">
                           {' '}
              <div className="flex items-center justify-between mb-7">
                               {' '}
                <div>
                                   {' '}
                  <span className="text-xs text-purple-400 font-medium">
                                        EXPLORE                  {' '}
                  </span>
                                   {' '}
                  <h3 className="text-lg font-bold text-white mt-1">
                                        {activeCategory?.title}                 {' '}
                  </h3>
                                 {' '}
                </div>
                               {' '}
                <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1.5 rounded-full">
                                    {activeCategory?.subCategories?.length || 0} زیر دسته          
                       {' '}
                </span>
                             {' '}
              </div>
                           {' '}
              <div className="grid grid-cols-3 gap-x-5 gap-y-4">
                               {' '}
                {activeCategory?.subCategories?.length === 0 ? (
                  <Link
                    to={'/'}
                    onClick={(e) => e.preventDefault()}
                    className="group flex items-center gap-2 p-3 rounded-xl border border-transparent hover:border-purple-500/20 hover:bg-purple-500/5 transition-all duration-200"
                  >
                                       {' '}
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60 group-hover:bg-purple-400 group-hover:scale-125 transition-all" />
                                       {' '}
                    <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                                            زیر دسته بندی یافت نشد                    {' '}
                    </span>
                                     {' '}
                  </Link>
                ) : (
                  activeCategory?.subCategories?.map((sub) => (
                    <div key={sub._id} className="">
                                           {' '}
                      <Link
                        to={`category/${activeCategory.slug}/${sub.slug}`}
                        onClick={(e) => e.preventDefault()}
                        className="group flex items-center gap-2 p-3 rounded-xl border border-transparent hover:border-purple-500/20 hover:bg-purple-500/5 transition-all duration-200"
                      >
                                               {' '}
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60 group-hover:bg-purple-400 group-hover:scale-125 transition-all" />
                                               {' '}
                        <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                                                    {sub.title}                       {' '}
                        </span>
                                             {' '}
                      </Link>
                                           {' '}
                      <ul>
                                               {' '}
                        {sub.subCategories?.map((leaf) => (
                          <li key={leaf._id}>
                                                       {' '}
                            <Link
                              to={`category/${activeCategory.slug}/${sub.slug}/${leaf.slug}`}
                              className="text-sm text-zinc-500 p-3 hover:text-purple-500 "
                            >
                                                            {leaf.title}                         
                               {' '}
                            </Link>
                                                     {' '}
                          </li>
                        ))}
                                             {' '}
                      </ul>
                                         {' '}
                    </div>
                  ))
                )}
                             {' '}
              </div>
                         {' '}
            </div>
                     {' '}
          </div>
                 {' '}
        </div>
      )}
         {' '}
    </div>
  );
};

export default CategoryMegaMenu;
