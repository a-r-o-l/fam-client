import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apartmentsApiService } from "../../apartmentsApiService";

export const useUpdateApartmentMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return apartmentsApiService.updateApartment(params.id, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getBuildings");
      await queryClient.invalidateQueries("getApartments");
    },
    ...options,
  });
};
