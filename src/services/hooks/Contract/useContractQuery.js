import { useQuery } from "@tanstack/react-query";
import { contractsApiService } from "../../contractsApiService";

export const useGetContractsQuery = (params, options) => {
  return useQuery({
    queryKey: ["getContracts"],
    queryFn: () => {
      return contractsApiService.getContracts(params);
    },
    ...options,
  });
};

export const useGetContractQuery = (params, options) => {
  return useQuery({
    queryKey: ["getContracts"],
    queryFn: () => {
      if (!!params.id) {
        return contractsApiService.getContract(params.id);
      } else {
        return null;
      }
    },
    ...options,
  });
};
