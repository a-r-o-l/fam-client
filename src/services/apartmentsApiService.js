import { http } from "./http";

const getApartment = async (id) => {
  const response = await http.get(`/apartments/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getApartments = async (params) => {
  let response;
  if (params.buildingId) {
    response = await http.get(`/apartments?buildingId=${params.buildingId}`);
  } else {
    response = await http.get(`/apartments`);
  }
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createApartment = async (data) => {
  const response = await http.post(`/apartments`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateApartment = async (id, data) => {
  const response = await http.put(`/apartments/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteApartment = async (id) => {
  const response = await http.delete(`/apartments/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const apartmentsApiService = {
  getApartment,
  getApartments,
  createApartment,
  updateApartment,
  deleteApartment,
};
