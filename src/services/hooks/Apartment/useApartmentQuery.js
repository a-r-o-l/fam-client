import { useQuery } from "@tanstack/react-query";
import { apartmentsApiService } from "../../apartmentsApiService";

export const useGetApartmentsQuery = (params, options) => {
  return useQuery({
    queryKey: params?.buildingId
      ? ["getApartments", params.buildingId]
      : ["getApartments"],
    queryFn: () => {
      return apartmentsApiService.getApartments(params);
    },
    ...options,
  });
};
