import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contractsApiService } from "../../contractsApiService";

export const useUpdateContractMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return contractsApiService.updateContract(params.id, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getContracts");
      await queryClient.invalidateQueries("getApartments");
    },
    ...options,
  });
};

export const useCreateContractMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return contractsApiService.createContract(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getContracts");
    },
    ...options,
  });
};

export const useDeleteContractMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return contractsApiService.deleteContract(params.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getContracts");
    },
    ...options,
  });
};
