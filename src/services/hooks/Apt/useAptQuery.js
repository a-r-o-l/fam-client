import { useQuery } from "@tanstack/react-query";
import { AptsApiService } from "../../AptsApiService";

export const useGetAptQuery = (params, options) => {
  return useQuery({
    queryKey: ["getApt", params.AptId],
    queryFn: () => {
      return AptsApiService.getApt(params);
    },
    ...options,
  });
};

export const useGetAptsQuery = (params, options) => {
  return useQuery({
    queryKey: ["getApts"],
    queryFn: () => {
      return AptsApiService.getApts(params);
    },
    ...options,
  });
};
