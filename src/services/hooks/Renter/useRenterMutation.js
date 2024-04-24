import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renterApiService } from "../../renterApiService";

export const useUpdateRenterMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return renterApiService.updateRenter(params.id, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getRenters");
    },
    ...options,
  });
};

export const useCreateRenterMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return renterApiService.createRenter(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getRenters");
    },
    ...options,
  });
};

export const useDeleteRenterMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return renterApiService.deleteRenter(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getRenters");
    },
    ...options,
  });
};
