import { useEffect, useState } from "react";
import { updateSubcategory } from "../../services/category.service";
import { toast } from "sonner";

const emptyFilter = {
  name: "",
  slug: "",
  type: "",
  description: "",
  options: [],
};

export const useEditSubCategory = (category, isOpen, onClose, onSuccess) => {
  const [parent, setParent] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [filters, setFilters] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Initial Values
  useEffect(() => {
    if (isOpen && category) {
      setParent(category?.parent || "");
      setTitle(category.title || "");
      setSlug(category.slug || "");
      setDescription(category.description || "");
      setIconFile(null);

      setFilters(
        (category.filters || []).map((filter) => ({
          ...emptyFilter,
          ...filter,
          options: filter.options || [],
        })),
      );

      setError("");
    }
  }, [isOpen, category]);

  // Add Filter
  const addFilter = () => {
    setFilters((prev) => [...prev, { ...emptyFilter }]);
  };

  // Remove Filter
  const removeFilter = (index) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  // Update Filter
  const updateFilter = (index, field, value) => {
    setFilters((prev) =>
      prev.map((filter, i) =>
        i === index ? { ...filter, [field]: value } : filter,
      ),
    );
  };

  // Update Filter Options
  const updateOptions = (index, value) => {
    setFilters((prev) =>
      prev.map((filter, i) =>
        i === index
          ? {
              ...filter,
              options: value.split(",").map((item) => item.trim()),
            }
          : filter,
      ),
    );
  };

  // Reset Form
  const resetForm = () => {
    setParent("");
    setTitle("");
    setSlug("");
    setDescription("");
    setIconFile(null);
    setFilters([]);
    setError("");
  };

  // Submit
  const handleSubmit = async () => {
    if (!title.trim() || !slug.trim() || !description.trim()) {
      toast.error("عنوان، لینک و توضیحات ضروری هستند");
      return;
    }

    if (!category?._id) {
      toast.error("شناسه زیر دسته‌بندی یافت نشد");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      parent: parent,
      filters,
      ...(iconFile && { iconFile }),
    };

    try {
      await updateSubcategory(category._id, payload);

      toast.success("زیر دسته‌بندی با موفقیت ویرایش شد");

      resetForm();
      onClose();
      onSuccess?.();
    } catch (err) {
      console.log("Update error:", err.response?.data);

      const message =
        err.response?.data?.message || "خطا در ویرایش زیر دسته‌بندی";

      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return {
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
  };
};
