import { useMutation } from "@tanstack/react-query";
import { reservationsApiService } from "../../reservationsApiService";

export const useUpdateReservationMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return reservationsApiService.updateReservation(params.id, params.data);
    },
    ...options,
  });
};

export const useCreateReservationMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return reservationsApiService.createReservation(params);
    },
    ...options,
  });
};

export const useDeleteReservationMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return reservationsApiService.deleteReservation(params.id);
    },
    ...options,
  });
};
