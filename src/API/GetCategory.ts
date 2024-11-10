import { CATEGORY } from "../constants";
import api from "../utils/axiosInterceptor";

const getCategory = async () => {
  const response = await api.get(CATEGORY);
  return response;
};

export { getCategory };
