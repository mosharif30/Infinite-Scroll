import api from "../utils/axiosInterceptor";

export const GetProductsWithPagination = async (
  limit: number,
  skip: number
) => {
  const result = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return result;
};
