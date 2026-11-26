import api from "./api";

const createProduct = async (formData) => {
  console.log([...formData.entries()]);

  const { data } = await api.post("/products", formData);

  return data;
};

export const getAllProduct = async (params) => {
  const { data } = await api.get("/products", params);

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);

  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await api.patch(`/products/${id}`, formData);

  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);

  return data;
};

export default createProduct;
