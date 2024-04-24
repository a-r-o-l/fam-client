import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buildingsApiService } from "../../buildingsApiService";

export const useCreateBuildingMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return buildingsApiService.createBuilding(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getBuildings");
    },
    ...options,
  });
};

export const useDeleteBuildingMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return buildingsApiService.deleteBuilding(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getBuildings");
    },
    ...options,
  });
};

export const useUpdateBuildingMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return buildingsApiService.updateBuilding(params.id, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getBuildings");
    },
    ...options,
  });
};
