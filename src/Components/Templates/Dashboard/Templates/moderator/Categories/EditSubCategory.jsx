import React, { useEffect, useReducer, useState } from "react";
import ModalIndex from "../../../common/Modal/ModalIndex";
import { useCateoryForm } from "../../../../../../lib/Hooks/useCategoryForm";
import { toast } from "sonner";
import { updateSubcategory } from "../../../../../../services/category.service";
import { useEditSubCategory } from "../../../../../../lib/Hooks/useEditSubCategory";

const emptyFilter = {
  name: "",
  slug: "",
  type: "",
  description: "",
  options: [],
};

const EditSubCategory = ({ isOpen, onClose, category, onSuccess }) => {
  const {
    parent,
    title,
    setTitle,
    slug,
    setSlug,
    description,
    setDescription,
    iconFile,
    setIconFile,
    filters,

    isSubmitting,
    error,

    addFilter,
    removeFilter,
    updateFilter,
    updateOptions,

    handleSubmit,
    handleClose,
  } = useEditSubCategory(category, isOpen, onClose, onSuccess);
  return (
    <div>
      {isOpen && (
        <ModalIndex
          onClose={handleClose}
          onSubmit={handleSubmit}
          pending={isSubmitting}
        >
          <div className="max-h-[65vh] space-y-5 overflow-y-auto scrollbar-none">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                عنوان دسته‌بندی
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                placeholder="عنوان دسته‌بندی را وارد کنید"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <input
              value={parent}
              readOnly
              name="parent"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/70 px-4 py-3 text-sm text-white outline-none"
            />

            {/* Slug */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Slug
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                name="slug"
                placeholder="category-slug"
                dir="ltr"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                توضیحات
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                rows={3}
                placeholder="توضیحات دسته‌بندی را وارد کنید..."
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Icon */}
            {/* <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                آیکون دسته‌بندی
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-800/40 p-6 text-center transition hover:border-purple-500 hover:bg-purple-500/5">
                <span className="text-2xl text-purple-400">+</span>
                <span className="text-sm text-zinc-300">
                  انتخاب تصویر برای آپلود
                </span>
                <span className="text-xs text-zinc-500">PNG, JPG, SVG</span>

                <input
                  onChange={(e) => setIconFile(e.target.files[0] || null)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>

              {form.icon && (
              <p className="mt-2 text-xs text-purple-400">
                {form.icon.name || form.icon}
              </p>
            )}
            </div> */}

            {/* Filters */}
            <button
              className="border border-purple-500/50 bg-purple-500/10 w-full py-2 hover:border-purple-500/70 hover:bg-purple-500/20"
              onClick={addFilter}
            >
              + افزودن فیلتر
            </button>

            {filters.map((filter, index) => {
              return (
                <div className="grid grid-cols-1 gap-5" key={index}>
                  <input
                    className="border border-zinc-700 p-2 rounded-sm"
                    value={filter.name}
                    onChange={(e) =>
                      updateFilter(index, "name", e.target.value)
                    }
                    placeholder="نام فیلتر"
                  />

                  <input
                    className="border border-zinc-700 p-2 rounded-sm"
                    value={filter.slug}
                    onChange={(e) =>
                      updateFilter(
                        index,
                        "slug",
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9_-]/g, "-"),
                      )
                    }
                    placeholder="product-filter"
                    dir="ltr"
                  />

                  <select
                    value={filter.type}
                    onChange={(e) =>
                      updateFilter(index, "type", e.target.value)
                    }
                    className="text-purple-500 text-sm bg-zinc-900"
                  >
                    <option value="">انتخاب نوع</option>
                    <option value="selectbox">Select Box</option>{" "}
                    <option value="radio">Radio</option>
                  </select>

                  <textarea
                    className="border border-zinc-700 p-2 rounded-sm"
                    value={filter.description}
                    onChange={(e) =>
                      updateFilter(index, "description", e.target.value)
                    }
                    placeholder="توضیحات"
                  />

                  <input
                    className="border border-zinc-700 p-2 rounded-sm"
                    value={filter.options.join(", ")}
                    onChange={(e) => updateOptions(index, e.target.value)}
                    placeholder="قرمز، آبی، مشکی"
                  />

                  <button
                    className="border border-red-500/50 text-sm px-4 py-1 bg-red-500/10
                hover:border-red-500/70 hover:bg-red-500/20"
                    onClick={() => removeFilter(index)}
                  >
                    حذف فیلتر
                  </button>
                </div>
              );
            })}
          </div>

          {/* {error && <p>{error?.message}</p>} */}
        </ModalIndex>
      )}
    </div>
  );
};

export default EditSubCategory;
