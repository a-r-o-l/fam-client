import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upgradesApiService } from "../../upgradesApiService";

export const useCreateUpgradeMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return upgradesApiService.createUpgrade(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getRenters");
    },
    ...options,
  });
};
