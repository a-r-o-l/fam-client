import { useQuery } from "@tanstack/react-query";
import { apartmentsApiService } from "../../apartmentsApiService";

export const useGetApartmentsQuery = (params, options) => {
  return useQuery({
    queryKey: ["getApartments"],
    queryFn: () => {
      return apartmentsApiService.getApartments(params);
    },
    ...options,
  });
};
