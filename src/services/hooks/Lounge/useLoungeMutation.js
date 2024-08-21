import { useMutation } from "@tanstack/react-query";
import { loungesApiService } from "../../loungesApiService";

export const useUpdateLoungeMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return loungesApiService.updateLounge(params.id, params.data);
    },
    ...options,
  });
};

export const useCreateLoungeMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return loungesApiService.createLounge(params);
    },
    ...options,
  });
};

export const useDeleteLoungeMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return loungesApiService.deleteLounge(params.id);
    },
    ...options,
  });
};
