import { useQuery } from "@tanstack/react-query";
import { renterApiService } from "../../renterApiService";

export const useGetRentersQuery = (params, options) => {
  return useQuery({
    queryKey: ["getRenters"],
    queryFn: () => {
      return renterApiService.getRenters(params);
    },
    ...options,
  });
};

export const useGetRenterQuery = (params, options) => {
  return useQuery({
    queryKey: ["getRenter", params.id],
    queryFn: () => {
      return renterApiService.getRenter(params);
    },
    ...options,
  });
};

export const useGetRenterByContractQuery = (params, options) => {
  return useQuery({
    queryKey: ["getRenter", params.activeContractId],
    queryFn: () => {
      return renterApiService.getRenterByContract(params);
    },
    ...options,
  });
};
