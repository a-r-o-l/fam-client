import { http } from "./http";

const getRenter = async (params) => {
  const response = await http.get(`/renters/${params.id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getRenterByContract = async (params) => {
  const response = await http.get(
    `/renter/contract/${params.activeContractId}`
  );
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getRenters = async (data) => {
  const response = await http.get(`/renters`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createRenter = async (data) => {
  const response = await http.post(`/renters`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateRenter = async (id, data) => {
  const response = await http.put(`/renters/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteRenter = async (id) => {
  const response = await http.delete(`/renters/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const renterApiService = {
  getRenter,
  getRenters,
  createRenter,
  updateRenter,
  deleteRenter,
  getRenterByContract,
};
