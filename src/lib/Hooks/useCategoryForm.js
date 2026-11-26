import { useState } from "react";
import { createCategory } from "../../services/category.service";
import { toast } from "sonner";

export const useCateoryForm = (onSuccess) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async ({ title, slug, description, iconFile, filters }) => {
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    iconFile && formData.append("iconFile", iconFile);
    formData.append("filters", JSON.stringify(filters));

    try {
      await createCategory(formData);

      onSuccess();
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Response data:", error.response?.data);
      console.log("Request data:", [...formData.entries()]);

      setError(error?.response?.data?.message || "خطا در ایجاد دسته‌بندی");
      toast.error(error?.response?.data?.message || "خطا در ایجاد دسته‌بندی");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, error, submit };
};
