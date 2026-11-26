import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/category.service";
import {
  getProductById,
  updateProduct,
} from "../../../services/product.service";
import { toast } from "sonner";
import useProducts from "../../../lib/Hooks/useProducts";

const flattenCategories = (categories = []) => {
  return categories.flatMap((category) => [
    category,
    ...flattenCategories(category.subCategories || []),
  ]);
};

const EditProductForm = ({ product, isOpen, setIsOpnen }) => {
  const [categoryPath, setCategoryPath] = useState([]);
  const { refetch } = useProducts();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    subCategory: "",
    sellers: [],
    filterValues: {},
    customFields: {},
    images: [],
  });

  // مقداردهی اولیه اطلاعات محصول
  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name || "",
      slug: product.slug || "",
      description: product.description || "",
      subCategory: product.subCategory || "",
      sellers: product.sellers || [],
      filterValues: product.filterValues || {},
      customFields: product.customFields || {},
      images: product.images || [],
    });
  }, [product]);

  // پیدا کردن مسیر کامل دسته‌بندی
  useEffect(() => {
    let isActive = true;

    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        const categories = res.data.categories || [];
        const allCategories = flattenCategories(categories);

        const selectedCategory = allCategories.find(
          (category) => category._id === product?.subCategory,
        );

        if (!selectedCategory) {
          if (isActive) setCategoryPath([]);
          return;
        }

        const path = [];
        let current = selectedCategory;

        while (current) {
          path.unshift(current);

          const parentId = current.parent;

          current = parentId
            ? allCategories.find((category) => category._id === parentId)
            : null;
        }

        if (isActive) {
          setCategoryPath(path);
        }
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);

        if (isActive) setCategoryPath([]);
      }
    };

    setCategoryPath([]);

    if (product?.subCategory) {
      fetchCategories();
    }

    return () => {
      isActive = false;
    };
  }, [product?.subCategory]);

  // تغییر مقادیر فرم
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ذخیره اطلاعات فرم (فعلاً آزمایشی)

const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("subCategory", form.subCategory);

    const sellersPayload = form.sellers.map((seller) => ({
      id: seller._id || seller.id,
      seller:
        typeof seller.seller === "object" ? seller.seller._id : seller.seller,
      price: Number(seller.price),
      stock: Number(seller.stock),
    }));

    formData.set("sellers", JSON.stringify(sellersPayload));
    formData.set("filterValues", JSON.stringify(form.filterValues));
    formData.set("customFields", JSON.stringify(form.customFields));
    formData.set("images", JSON.stringify(form.images));

    console.log("1. Sending update request");

    const result = await updateProduct(product._id, formData);

    console.log("2. Update response:", result);

    toast.success("محصول با موفقیت آپدیت شد");

    setIsOpnen(false);
    refetch();
  } catch (error) {
    console.error("Update failed:", error);
    console.error("Response:", error.response?.data);

    toast.error(error.response?.data?.message || "خطا در آپدیت محصول");
  }
};


  if (!product) return null;

  return (
    <div
      className={`${isOpen ? "visible opacity-100" : "invisible opacity-0"} absolute inset-0 z-50 bg-black/70 p-4 backdrop-blur-sm overflow-hidden transition-opacity`}
    >
      <div
        dir="rtl"
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40"
      >
        {/* هدر مودال */}
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2">
          <div>
            <h3 className="font-semibold text-zinc-100">
              فرم ویرایش اطلاعات محصول
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setIsOpnen(false)}
            aria-label="بستن"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="modal-scrollbar min-h-0 flex-1 space-y-8 overflow-y-auto p-5 sm:p-6">
          {/* اطلاعات محصول */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-500 rounded-full" />
              <h3 className="text-sm text-purple-500">اطلاعات محصول</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2 w-full">
                <label className="block" htmlFor="productId">
                  شناسه محصول
                </label>

                <input
                  id="productId"
                  value={product._id || ""}
                  readOnly
                  className="border border-zinc-800 bg-zinc-900/60  rounded-sm p-2 w-full text-zinc-400"
                />
              </div>

              <div className="space-y-2 w-full">
                <label className="block" htmlFor="name">
                  عنوان محصول
                </label>

                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className="border border-zinc-800 bg-zinc-900/60  rounded-sm p-2 w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="عنوان محصول"
                />
              </div>

              <div className="space-y-2 w-full">
                <label className="block" htmlFor="slug">
                  لینک محصول
                </label>

                <input
                  id="slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  type="text"
                  className="border border-zinc-800 bg-zinc-900/60  rounded-sm p-2 w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="لینک محصول"
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <label className="block" htmlFor="description">
                توضیحات محصول
              </label>

              <textarea
                name="description"
                id="description"
                value={form.description}
                onChange={handleChange}
                placeholder="توضیحات محصول"
                className="border border-zinc-800 bg-zinc-900/60  rounded-sm p-2 w-full h-20 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* مسیر دسته‌بندی */}
            <div className="space-y-3">
              <label className="block text-sm text-zinc-300">
                مسیر دسته‌بندی محصول
              </label>

              <nav
                dir="rtl"
                aria-label="مسیر دسته‌بندی محصول"
                className="flex flex-wrap items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3"
              >
                {categoryPath.length > 0 ? (
                  categoryPath.map((category, index) => (
                    <div key={category._id} className="flex items-center gap-2">
                      <span
                        className={
                          index === categoryPath.length - 1
                            ? "text-sm font-medium text-purple-400"
                            : "text-sm text-zinc-400"
                        }
                      >
                        {category.title}
                      </span>

                      {index < categoryPath.length - 1 && (
                        <span className="text-zinc-600" aria-hidden="true">
                          ←
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-zinc-500">
                    دسته‌بندی پیدا نشد
                  </span>
                )}
              </nav>
            </div>
          </div>
          {/* اطلاعات فروشندگان */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-500 rounded-full" />
              <h3 className="text-sm text-purple-500">اطلاعات فروشندگان</h3>
            </div>

            {form.sellers.map((seller, index) => (
              <div
                key={seller._id || seller.id || index}
                className="grid grid-cols-1 gap-5 md:grid-cols-3"
              >
                {/* شناسه فروشنده؛ غیرقابل تغییر */}
                <div className="space-y-2">
                  <label>شناسه فروشنده</label>
                  <input
                    type="text"
                    value={seller._id || seller.id || ""}
                    readOnly
                    className="w-full rounded-sm border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-400"
                  />
                </div>

                {/* موجودی */}
                <div className="space-y-2">
                  <label htmlFor={`stock-${index}`}>موجودی محصول</label>
                  <input
                    id={`stock-${index}`}
                    type="number"
                    min="0"
                    value={seller.stock ?? 0}
                    onChange={(e) => {
                      const value = e.target.value;

                      setForm((prev) => ({
                        ...prev,
                        sellers: prev.sellers.map((item, i) =>
                          i === index ? { ...item, stock: value } : item,
                        ),
                      }));
                    }}
                    className="w-full rounded-sm border border-zinc-800 bg-zinc-900/60 p-2 focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                {/* قیمت */}
                <div className="space-y-2">
                  <label htmlFor={`price-${index}`}>قیمت محصول</label>
                  <input
                    id={`price-${index}`}
                    type="number"
                    min="0"
                    value={seller.price ?? 0}
                    onChange={(e) => {
                      const value = e.target.value;

                      setForm((prev) => ({
                        ...prev,
                        sellers: prev.sellers.map((item, i) =>
                          i === index ? { ...item, price: value } : item,
                        ),
                      }));
                    }}
                    className="w-full rounded-sm border border-zinc-800 bg-zinc-900/60 p-2 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ویژگی های فیلتری و سفارشی */}
          <div className="">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
              <h3 className="text-sm text-purple-500">
                ویژگی های فیلتری و سفارشی
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-zinc-200 rounded-full"></div>
              <h4 className="my-5 text-sm text-zinc-200">filterValues</h4>
            </div>
            <div className="grid grid-cols-2">
              {Object.entries(form.filterValues || {}).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label
                    htmlFor={`filter-${key}`}
                    className="block text-sm text-zinc-300"
                  >
                    {key}
                  </label>

                  <input
                    id={`filter-${key}`}
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => {
                      const { value } = e.target;

                      setForm((prev) => ({
                        ...prev,
                        filterValues: {
                          ...prev.filterValues,
                          [key]: value,
                        },
                      }));
                    }}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-sm text-zinc-100 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-zinc-200 rounded-full"></div>
              <h4 className="my-5 text-sm text-zinc-200">customFields</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(form.customFields || {}).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label
                    htmlFor={`filter-${key}`}
                    className="block text-sm text-zinc-300"
                  >
                    {key}
                  </label>

                  <input
                    id={`filter-${key}`}
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => {
                      const { value } = e.target;

                      setForm((prev) => ({
                        ...prev,
                        customFields: {
                          ...prev.customFields,
                          [key]: value,
                        },
                      }));
                    }}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-sm text-zinc-100 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>

            {/* تصاویر محصول */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 my-5">
                <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                <h3 className="text-sm text-purple-500">تصاویر محصول</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {(form.images || []).map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
                  >
                    <img
                      src={image}
                      alt={`${form.name} - تصویر ${index + 1}`}
                      className="h-32 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* فوتر ثابت مودال */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-zinc-800 bg-zinc-900/80 px-6 py-4">
          <button
            type="button"
            onClick={() => {
              setIsOpnen(false);
              console.log("close modal");
            }}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg border border-purple-400/20 bg-purple-500/15 px-5 py-2 text-sm font-medium text-purple-300 transition hover:bg-purple-500/25"
          >
            ذخیره اطلاعات فرم
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
