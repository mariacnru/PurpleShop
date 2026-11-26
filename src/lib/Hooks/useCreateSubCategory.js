import { useEffect, useState } from "react";
import {
  createSubcategory,
  getAllCategories,
  getAllSubcategories,
} from "../../services/category.service";
import { toast } from "sonner";

const initialFormValues = {
  title: "",
  slug: "",
  parent: "",
  description: "",
  filters: [],
};

const emptyFilter = {
  name: "",
  description: "",
  slug: "",
  type: "radio",
  optionsText: "",
  required: false,
};

const useCreateSubCategory = (onClose) => {
  const [parentCategories, setParentCategories] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(false);

  // دریافت دسته‌بندی‌های والد
  const getParentCategories = async () => {
    try {
      const response = await getAllCategories();
      setParentCategories(response.data.categories);
    } catch (error) {
      toast.error("دریافت دسته‌بندی‌ها ناموفق بود");
    }
  };

  useEffect(() => {
    getParentCategories();
  }, []);

  // تغییر مقادیر اصلی فرم
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // اضافه کردن فیلتر
  const addFilter = () => {
    setFormValues((prev) => ({
      ...prev,
      filters: [...prev.filters, { ...emptyFilter }],
    }));
  };

  // حذف فیلتر
  const removeFilter = (index) => {
    setFormValues((prev) => ({
      ...prev,
      filters: prev.filters.filter((_, i) => i !== index),
    }));
  };

  // تغییر اطلاعات فیلتر
  const handleFilterChange = (index, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      filters: prev.filters.map((filter, i) =>
        i === index ? { ...filter, [field]: value } : filter,
      ),
    }));
  };

  // ارسال فرم
  const handleSubmit = async () => {
    const payload = {
      title: formValues.title.trim(),
      slug: formValues.slug.trim(),
      parent: formValues.parent,
      description: formValues.description.trim(),

      filters: formValues.filters.map((filter) => ({
        name: filter.name.trim(),
        description: filter.description.trim(),
        slug: filter.slug.trim(),
        type: filter.type,

        options: filter.optionsText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        required: filter.required,
      })),
    };

    try {
      setIsLoading(true);

      const response = await createSubcategory(payload);

      toast.success(response.data.message || "دسته‌بندی با موفقیت ایجاد شد");

      setFormValues({ ...initialFormValues });
      onClose();
      window.location.reload();
    } catch (error) {
      console.log("Create subcategory error:", error.response?.data || error);

      toast.error(error.response?.data?.message || "خطا در ایجاد دسته‌بندی");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    parentCategories,
    formValues,
    isLoading,
    handleChange,
    addFilter,
    removeFilter,
    handleFilterChange,
    handleSubmit,
  };
};

export default useCreateSubCategory;
