import React, { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import useCreateSubCategory from '../../../../../../lib/Hooks/useCreateSubCategory';

const CreateSubCategoryModal = ({ isOpen, onClose, onSuccess }) => {
  const {
    parentCategories,
    formValues,
    isLoading,
    handleChange,
    addFilter,
    removeFilter,
    handleFilterChange,
    handleSubmit,
    errors,
  } = useCreateSubCategory(onClose);

  const inputStyle =
    'w-full rounded-xl border border-zinc-700 bg-zinc-800/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20';

  const inputLabel = 'mb-2 block text-sm font-medium text-zinc-300';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm m-0 invisible opacity-0 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
    >
      <div className="w-full p-5 max-w-lg overflow-auto scrollbar-none rounded-2xl border border-purple-500/20 bg-zinc-900 shadow-2xl shadow-purple-950/30 h-137">
        <div className="flex justify-between items-center border-b border-zinc-800 p-2">
          <h3 className="text-sm">ایجاد ساب دسته بندی</h3>
          <div
            className="hover:bg-zinc-700/50 p-2 rounded-md hover:text-red-500 transition-colors"
            onClick={onClose}
          >
            <RiCloseLine size={20} />
          </div>
        </div>

        {/* content */}
        <div className="p-5 overflow-auto scrollbar-none h-125">
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className={inputLabel}>
                عنوان
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title Text"
                value={formValues.title}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="slug" className={inputLabel}>
                لینک
              </label>
              <input
                type="text"
                name="slug"
                placeholder="title-slug-text"
                value={formValues.slug}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="parent" className={inputLabel}>
                دسته بندی والد
              </label>
              <select
                name="parent"
                value={formValues.parent}
                onChange={handleChange}
                className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-xl mb-2"
              >
                <option value="">انتخاب دسته‌بندی والد</option>

                {parentCategories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className={inputLabel}>
                توضیحات
              </label>
              <input
                type="text"
                name="description"
                placeholder="Description about category"
                value={formValues.description}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          {/* filters */}

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={addFilter}
              className="w-full text-center bg-purple-500/10 border border-purple-500/20 py-2 mt-5 hover:bg-purple-500/20 hover:border-purple-500/70"
            >
              افروزدن فیلتر
            </button>

            {formValues.filters.map((filter, index) => (
              <div key={index} className="border border-zinc-700 p-4 rounded-xl space-y-5">
                <input
                  value={filter.name}
                  placeholder="نام فیلتر"
                  onChange={(e) => handleFilterChange(index, 'name', e.target.value)}
                  className={inputStyle}
                />

                <input
                  value={filter.slug}
                  placeholder="Slug"
                  onChange={(e) => handleFilterChange(index, 'slug', e.target.value)}
                  className={inputStyle}
                />

                <input
                  value={filter.description}
                  placeholder="توضیحات"
                  onChange={(e) => handleFilterChange(index, 'description', e.target.value)}
                  className={inputStyle}
                />

                <select
                  value={filter.type}
                  onChange={(e) => handleFilterChange(index, 'type', e.target.value)}
                  className="w-full text-purple-50 bg-zinc-800 h-10 rounded-md px-2"
                >
                  <option value="radio">Radio</option>
                  <option value="selectbox">Selectbox</option>
                </select>

                <input
                  className={inputStyle}
                  value={filter.optionsText}
                  onChange={(e) => handleFilterChange(index, 'optionsText', e.target.value)}
                  placeholder="قرمز, آبی, مشکی"
                />

                <button
                  type="button"
                  onClick={() => removeFilter(index)}
                  className="w-full text-center bg-red-500/10 border border-red-500/20 py-2 mt-5 hover:bg-red-500/20 hover:border-red-500/70 text-sm"
                >
                  حذف فیلتر
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* buttons */}
        <footer className="flex justify-end gap-2 border-t border-zinc-700 pt-2">
          <button
            onClick={onClose}
            className=" bg-red-500/20 border border-red-500/50 p-2 hover:bg-red-500/30 hover:border-red-500/70"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-purple-500/20 border border-purple-500/50 p-2 hover:bg-purple-500/30 disabled:opacity-50"
          >
            {isLoading ? 'در حال ثبت...' : 'تایید'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateSubCategoryModal;
