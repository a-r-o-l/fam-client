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

const getPayments = async () => {
  const response = await http.get(`/payments/`);
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
};
