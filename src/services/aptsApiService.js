import { http } from "./http";

const getApt = async (id) => {
  const response = await http.get(`/apts/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getApts = async () => {
  let response;
  response = await http.get(`/apts`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createApt = async (data) => {
  const response = await http.post(`/apts`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateApt = async (id, data) => {
  const response = await http.put(`/apts/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteApt = async (id) => {
  const response = await http.delete(`/apts/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const housesApiService = {
  getApt,
  getApts,
  createApt,
  updateApt,
  deleteApt,
};
