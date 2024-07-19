import { useMutation, useQueryClient } from "@tanstack/react-query";
import { suscriptionsApiService } from "../../subscriptionsApiService";

export const usePreferenceMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return suscriptionsApiService.createPreference(params);
    },
    ...options,
  });
};

export const useSubscriptionMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return suscriptionsApiService.createSubscription(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getSubscriptions");
    },
    ...options,
  });
};

export const useDeleteSubscriptionMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return suscriptionsApiService.deleteSubscription(params.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getSubscriptions");
    },
    ...options,
  });
};
