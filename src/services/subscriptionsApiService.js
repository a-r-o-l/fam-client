import { http } from "./http";

const createPreference = async (data) => {
  const response = await http.post(`/preference`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createSubscription = async (data) => {
  const response = await http.post(`/subscription`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getSubscriptions = async () => {
  const response = await http.get(`/subscription`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteSubscription = async (id) => {
  const response = await http.delete(`/subscription/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const suscriptionsApiService = {
  createPreference,
  createSubscription,
  getSubscriptions,
  deleteSubscription,
};
