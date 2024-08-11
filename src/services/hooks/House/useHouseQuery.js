import { useQuery } from "@tanstack/react-query";
import { housesApiService } from "../../housesApiService";

export const useGetHouseQuery = (params, options) => {
  return useQuery({
    queryKey: ["getHouse", params.houseId],
    queryFn: () => {
      return housesApiService.getHouse(params);
    },
    ...options,
  });
};

export const useGetHousesQuery = (params, options) => {
  return useQuery({
    queryKey: ["getHouses"],
    queryFn: () => {
      return housesApiService.getHouses(params);
    },
    ...options,
  });
};
