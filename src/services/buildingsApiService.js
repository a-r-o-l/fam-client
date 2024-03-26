import { http } from "./http";

const getBuilding = async (id) => {
  const response = await http.get(`/buildings/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getBuildings = async () => {
  const response = await http.get(`/buildings`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createBuilding = async (data) => {
  const response = await http.post(`/buildings`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateBuilding = async (id, data) => {
  const response = await http.put(`/buildings/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteBuilding = async (id) => {
  const response = await http.delete(`/buildings/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const buildingsApiService = {
  getBuilding,
  getBuildings,
  createBuilding,
  updateBuilding,
  deleteBuilding,
};
