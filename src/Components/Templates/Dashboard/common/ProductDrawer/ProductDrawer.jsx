import React, { useEffect, useState } from "react";
import Drawer from "../Drawer/Drawer";
import ProductDrawerInput from "./ProductDrawerInput";
import useCategories from "../../../../../lib/Hooks/useCategories";
import CascadeCategories from "./cascadeCategories";
import useProductForm from "../../../../../lib/Hooks/useProductForm";
import createProduct from "../../../../../services/product.service";
import { toast } from "sonner";
import DynamicKeyValueFields from "./DynamicKeyValueFields";
import SellerFields from "./SellerFields";
import ImageUploadField from "./ImageUploadField";
import useProducts from "../../../../../lib/Hooks/useProducts";

const ProductDrawer = ({ isOpen, onToggle }) => {
  const { isLoading: categoriesIsLoading, categories } = useCategories();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    form,
    setField,
    selectedCategory,
    handleCategoryChange,
    addSeller,
    removeSeller,
    updateSeller,
    addPair,
    removePair,
    updatePair,
    setImages,
    buildFormData,
    resetForm,
  } = useProductForm();

  const { refetch } = useProducts();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    if (!form.name.trim() || !form.slug.trim() || !form.description.trim()) {
      setError("عنوان و لینک  و توضیحات محصول الزامی هستند");
      return;
    }

    if (!selectedCategory) {
      setError("انتخاب دسته بندی محصول الزامی است");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      await createProduct(buildFormData());
      resetForm();
      onToggle();
      toast.success("محصول با موفقیت ایجاد شد");
    } catch (err) {
      console.log("Error:", err);
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      console.dir(err.response.data.data, { depth: null });
      toast.error(error);

      setError(err.response?.data?.message || "خطا در ایجاد محصول");
    } finally {
      setIsSubmitting(false);
    }

    setIsSubmitting(false);
    refetch();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onToggle} title="ایجاد محصول">
      <ProductDrawerInput
        label="عنوان محصول"
        placeholder="sumsung S24"
        type="text"
        value={form.name}
        onChange={(e) => setField("name", e.target.value)}
      />
      <ProductDrawerInput
        label="لینک"
        placeholder="sumsung-S24"
        type="text"
        value={form.slug}
        onChange={(e) => setField("slug", e.target.value)}
      />

      <div className="my-5">
        <label htmlFor="">دسته بندی</label>

        {categoriesIsLoading ? (
          <p className="text-xs text-zinc-200">در حال بارگذاری</p>
        ) : (
          <CascadeCategories
            categories={categories}
            onChange={handleCategoryChange}
          />
        )}
      </div>

      <SellerFields
        sellers={form.sellers}
        onAdd={addSeller}
        onRemove={removeSeller}
        onChange={updateSeller}
      />

      <div className="">
        <DynamicKeyValueFields
          title={"ویژگی های فیلتری"}
          items={form.filterValues}
          onAdd={() => addPair("filterValues")}
          onRemove={(index) => removePair("filterValues", index)}
          onChange={(index, key, value) =>
            updatePair("filterValues", index, key, value)
          }
        />

        <DynamicKeyValueFields
          title={"ویژگی های سفارشی"}
          items={form.customFields}
          onAdd={() => addPair("customFields")}
          onRemove={(index) => removePair("customFields", index)}
          onChange={(index, key, value) =>
            updatePair("customFields", index, key, value)
          }
        />
      </div>

      <ImageUploadField files={form.images} onChange={setImages} />

      <div className="">
        <label htmlFor="product-details"> توضیحات محصول</label>
        <textarea
          name=""
          id="product-details"
          className="w-full h-20 border border-zinc-800 rounded-sm focus:border-purple-600 focus:ring-1 focus:ring-purple-600/20"
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
        ></textarea>
      </div>

      {/* {error && <p className="text-red-500 text-sm mt-5">{error}.</p>} */}

      <div className="space-x-2 mt-5">
        <button className="p-2 rounded-sm bg-red-500/10 border border-red-500/50 text-red-400 text-sm hover:scale-95 focus:scale-95 cursor-pointer">
          انصراف
        </button>
        <button
          className="p-2 rounded-sm bg-purple-500/10 border border-purple-500/50 text-purple-400 text-sm hover:scale-95 focus:scale-95 cursor-pointer"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "درحال ثبت..." : "ایجاد محصول"}
        </button>
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
