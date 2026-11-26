import api from "./api";

export const getAllCategories = async () => {
  const { data } = await api.get("/category");

  return data;
};

export const createCategory = async (formData) => {
  const { data } = await api.post("/category", formData);
  console.log(formData);

  return data;
};

export const updateCategory = async (id, formData) => {
  const { data } = await api.put(`/category/${id}`, formData);

  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/category/${id}`);

  return data;
};

export const getAllSubcategories = async () => {
  const { data } = await api.get("/category/sub");

  return data;
};

export const createSubcategory = async (formData) => {
  const { data } = await api.post("/category/sub", formData);

  return data;
};

export const updateSubcategory = async (id, jsonData) => {
  const { data } = await api.put(`/category/sub/${id}`, jsonData);

  return data;
};

export const deleteSubcategory = async (id) => {
  const { data } = await api.delete(`/category/sub/${id}`);

  return data;
};
