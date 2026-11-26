import { useCallback, useEffect, useState } from "react";
import { getAllSubcategories } from "../../services/category.service";

const useSubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getAllSubcategories();

      setSubCategories(res?.data?.categories || []);
    } catch (error) {
      setError(
        error?.response?.data?.message || "خطا در دریافت زیر دسته‌بندی‌ها",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    subCategories,
    isLoading,
    refetch: fetchData,
    error,
  };
};

export default useSubCategories;
