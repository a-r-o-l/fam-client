import { useQuery } from "@tanstack/react-query";
import { buildingsApiService } from "../../buildingsApiService";

export const useGetBuildingsQuery = (params, options) => {
  return useQuery({
    queryKey: ["getBuildings"],
    queryFn: () => {
      return buildingsApiService.getBuildings(params);
    },
    ...options,
  });
};
