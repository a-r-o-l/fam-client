import { useMutation } from "@tanstack/react-query";
import { apartmentsApiService } from "../../apartmentsApiService";

export const useUpdateApartmentMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return apartmentsApiService.updateApartment(params.id, params.data);
    },
    ...options,
  });
};

export const useCreateApartmentMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return apartmentsApiService.createApartment(params);
    },
    ...options,
  });
};

export const useDeleteApartmentMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return apartmentsApiService.deleteApartment(params.id);
    },
    ...options,
  });
};
