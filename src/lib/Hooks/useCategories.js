import { useCallback, useEffect, useState } from "react";
import { getAllCategories } from "../../services/category.service";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getAllCategories();
      setCategories(res?.data?.categories || []);
    } catch (error) {
      setError(error?.response?.data?.message || "خطا در دریافت دسته‌بندی‌ها");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    categories,
    isLoading,
    refetch: fetchData,
    error,
  };
};

export default useCategories;
