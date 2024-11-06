import api from "../utils/axiosInterceptor";

const getProductById = async (productId: string | undefined) => {
  const response = await api.get(`/products/${productId}`);
  return response;
};

export { getProductById };
