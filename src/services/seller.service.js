import api from "./api";

const searchSellers = async (query) => {
  const { data } = await api.get("/sellers/search", { params: { q: query } });

  return data.data.sellers || [];
};

export default searchSellers;
