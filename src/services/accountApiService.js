import { http } from "./http";

const createSession = async (data) => {
  const response = await http.post("/login", data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createAccount = async (data) => {
  const response = await http.post("/account", data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateAccount = async (accountId, data) => {
  const response = await http.put(`/account/${accountId}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const findAccount = async (search_params) => {
  const response = await http.get(`/account/find/${search_params}`);
  return response?.data;
};

export const accountApiService = {
  createSession,
  createAccount,
  updateAccount,
  findAccount,
};
