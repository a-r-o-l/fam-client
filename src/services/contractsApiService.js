import { http } from "./http";

const getContract = async (id) => {
  const response = await http.get(`/contracts/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getContracts = async () => {
  const response = await http.get(`/contracts`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createContract = async (data) => {
  const response = await http.post(`/contracts`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateContract = async (id, data) => {
  const response = await http.put(`/contracts/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteContract = async (id) => {
  const response = await http.delete(`/contracts/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const contractsApiService = {
  getContract,
  getContracts,
  createContract,
  updateContract,
  deleteContract,
};
