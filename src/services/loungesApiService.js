import { http } from "./http";

const getLounge = async (id) => {
  const response = await http.get(`/lounges/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getLounges = async () => {
  let response;
  response = await http.get(`/lounges`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createLounge = async (data) => {
  const response = await http.post(`/lounges`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateLounge = async (id, data) => {
  const response = await http.put(`/lounges/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteLounge = async (id) => {
  const response = await http.delete(`/lounges/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const loungesApiService = {
  getLounge,
  getLounges,
  createLounge,
  updateLounge,
  deleteLounge,
};
