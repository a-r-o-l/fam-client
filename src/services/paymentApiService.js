import { http } from "./http";

const getPayment = async (id) => {
  const response = await http.get(`/payments/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createPayment = async (data) => {
  const response = await http.post(`/payments`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getPayments = async (data) => {
  let endpoint = "/payments";
  if (data?.buildingId && data?.buildingId !== "todos") {
    endpoint += `?buildingId=${data.buildingId}`;
    if (data?.renterId && data?.renterId !== "todos") {
      endpoint += `&renterId=${data.renterId}`;
    }
  } else if (data?.renterId && data?.renterId !== "todos") {
    endpoint += `?renterId=${data.renterId}`;
  }

  const response = await http.get(endpoint);
  if (response?.data) {
    return response.data;
  } else {
    return null;
  }
};

const deletePayment = async (id) => {
  const response = await http.delete(`/payments/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updatePayment = async (id, data) => {
  const response = await http.put(`/payments/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const paymentApiService = {
  getPayment,
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
};
