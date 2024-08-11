import { http } from "./http";

const getAnalitycs = async (params) => {
  const response = await http.get(
    `/analitycs?type=${params.type}&from=${params.from}&to=${params.to}`
  );
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getFeatures = async () => {
  const response = await http.get(`/analitycs/features`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const analitycsApiService = {
  getAnalitycs,
  getFeatures,
};
