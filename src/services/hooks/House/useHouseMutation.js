import { useMutation } from "@tanstack/react-query";
import { housesApiService } from "../../housesApiService";

export const useUpdateHouseMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return housesApiService.updateHouse(params.id, params.data);
    },
    ...options,
  });
};

export const useCreateHouseMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return housesApiService.createHouse(params);
    },
    ...options,
  });
};

export const useDeleteHouseMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return housesApiService.deleteHouse(params.id);
    },
    ...options,
  });
};
