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

const checkPassword = async (accountId, password) => {
  const response = await http.post(`/account/password/check/${accountId}`, {
    password,
  });
  return response?.data || false;
};

const createPassword = async (accountId, password) => {
  const response = await http.post(`/account/password/${accountId}`, {
    password,
  });
  return response?.data || false;
};

const updatePassword = async (accountId, password) => {
  const response = await http.put(`/account/password/${accountId}`, {
    password,
  });
  return response?.data || false;
};

export const accountApiService = {
  createSession,
  createAccount,
  updateAccount,
  findAccount,
  checkPassword,
  createPassword,
  updatePassword,
};
