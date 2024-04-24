import { http } from "./http";

const getAnalitycs = async () => {
  const response = await http.get("analitycs");
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const analitycsApiService = {
  getAnalitycs,
};
