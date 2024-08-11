import { http } from "./http";

const getHouse = async (id) => {
  const response = await http.get(`/houses/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getHouses = async () => {
  let response;
  response = await http.get(`/houses`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createHouse = async (data) => {
  const response = await http.post(`/houses`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateHouse = async (id, data) => {
  const response = await http.put(`/houses/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteHouse = async (id) => {
  const response = await http.delete(`/houses/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const housesApiService = {
  getHouse,
  getHouses,
  createHouse,
  updateHouse,
  deleteHouse,
};
