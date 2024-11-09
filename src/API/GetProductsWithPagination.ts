import { PRODUCT_ENDPOINT } from "../constants";
import api from "../utils/axiosInterceptor";

export const GetProductsWithPagination = async (
  limit: number,
  skip: number
) => {
  const endpoint = `${PRODUCT_ENDPOINT}?limit=${limit}&skip=${skip}`;
  const result = await api.get(endpoint);
  return result;
};
