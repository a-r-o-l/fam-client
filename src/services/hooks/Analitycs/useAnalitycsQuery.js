import { useQuery } from "@tanstack/react-query";
import { analitycsApiService } from "../../analitycsApiService";

export const useAnalitycsQuery = (params, options) => {
  return useQuery({
    queryKey: ["getAnalitycs", params.from, params.to],
    queryFn: () => {
      return analitycsApiService.getAnalitycs(params);
    },
    ...options,
  });
};

export const useAnalitycsFeaturesQuery = (params, options) => {
  return useQuery({
    queryKey: ["getAnalitycsFeatures"],
    queryFn: () => {
      return analitycsApiService.getFeatures(params);
    },
    ...options,
  });
};
