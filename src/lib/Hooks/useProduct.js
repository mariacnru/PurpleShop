import { useEffect, useState } from "react";
import { getProductById } from "../../services/product.service";

const useProduct = (productSlug) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await getProductById(productSlug);

      setProduct(res?.data?.product || []);
    } catch (err) {
      setError("خطا در دریافت جزئیات محصول");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productSlug) {
      fetchData();
    }
  }, [productSlug]);

  return { product, isLoading, error };
};

export default useProduct;
