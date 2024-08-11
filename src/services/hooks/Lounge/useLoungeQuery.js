import { useQuery } from "@tanstack/react-query";
import { loungesApiService } from "../../loungesApiService";

export const useGetLoungeQuery = (params, options) => {
  return useQuery({
    queryKey: ["getLounge", params.loungeId],
    queryFn: () => {
      return loungesApiService.getLounge(params);
    },
    ...options,
  });
};

export const useGetLoungesQuery = (params, options) => {
  return useQuery({
    queryKey: ["getLounges"],
    queryFn: () => {
      return loungesApiService.getLounges(params);
    },
    ...options,
  });
};
