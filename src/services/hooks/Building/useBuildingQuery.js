import { useQuery } from "@tanstack/react-query";
import { buildingsApiService } from "../../buildingsApiService";

export const useGetBuildingsQuery = (params, options) => {
  return useQuery({
    queryKey: ["getProperties"],
    queryFn: () => {
      return buildingsApiService.getProperties(params);
    },
    ...options,
  });
};

export const useGetBuildingsByTypeQuery = (params, options) => {
  return useQuery({
    queryKey: ["getProperties"],
    queryFn: () => {
      return buildingsApiService.getPropertiesByType(params);
    },
    ...options,
  });
};
