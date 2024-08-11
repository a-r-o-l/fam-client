import { useMutation } from "@tanstack/react-query";
import { housesApiService } from "../../loungesApiService";

export const useUpdateLoungeMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return housesApiService.updateLounge(params.id, params.data);
    },
    ...options,
  });
};

export const useCreateLoungeMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return housesApiService.createLounge(params);
    },
    ...options,
  });
};

export const useDeleteLoungeMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return housesApiService.deleteLounge(params.id);
    },
    ...options,
  });
};
