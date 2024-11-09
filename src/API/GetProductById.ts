import { PRODUCT_ENDPOINT } from "../constants";
import api from "../utils/axiosInterceptor";

const getProductById = async (productId: string | undefined) => {
  const endpoint = `${PRODUCT_ENDPOINT}/${productId}`;
  const response = await api.get(endpoint);
  return response;
};

export { getProductById };
