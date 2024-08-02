import { http } from "./http";

const getBuilding = async (id) => {
  const response = await http.get(`/property/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getProperties = async () => {
  const response = await http.get(`/property`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getPropertiesByType = async (params) => {
  const response = await http.get(`/property?type=${params.type}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createBuilding = async (data) => {
  const response = await http.post(`/property`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateBuilding = async (id, data) => {
  const response = await http.put(`/property/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteBuilding = async (param) => {
  const response = await http.delete(`/property/${param.id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const buildingsApiService = {
  getBuilding,
  getProperties,
  createBuilding,
  updateBuilding,
  deleteBuilding,
  getPropertiesByType,
};
