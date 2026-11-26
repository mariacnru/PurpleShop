import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../services/product.service";

const useProducts = (limit = 10) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await getAllProduct({ page, limit });
      setProducts(res?.data?.products || []);
      setPagination(res?.data?.pagination || null);
    } catch (error) {
      setError(error?.response?.data?.message || "خطا در دریافت محصولات");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  return {
    products,
    pagination,
    page,
    setPage,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};

export default useProducts;
