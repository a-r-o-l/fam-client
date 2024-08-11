import { http } from "./http";

const getReservation = async (id) => {
  const response = await http.get(`/reservations/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const getReservations = async () => {
  let response;
  response = await http.get(`/reservations`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const createReservation = async (data) => {
  const response = await http.post(`/reservations`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const updateReservation = async (id, data) => {
  const response = await http.put(`/reservations/${id}`, data);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

const deleteReservation = async (id) => {
  const response = await http.delete(`/reservations/${id}`);
  if (response?.data) {
    return response.data;
  } else {
    return false;
  }
};

export const reservationsApiService = {
  getReservation,
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
};
