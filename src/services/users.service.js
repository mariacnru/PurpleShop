import api from "./api";

export const getAllUsers = async (params) => {
  const { data } = await api.get("/users", { params });

  return data;
};

export const banUser = async (id) => {
  const { data } = await api.post(`/users/ban/${id}`);

  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);

  return data;
};

export const editUser = async (formData) => {
  const { data } = await api.patch("/users/me/profile", formData);

  return data;
};
