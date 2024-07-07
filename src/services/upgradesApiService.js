import { http } from "./http";

const createUpgrade = async (data) => {
  const response = await http.post(`/upgrades`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const upgradesApiService = {
  createUpgrade,
};
