import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentApiService } from "../../paymentApiService";

export const useUpdatePaymentMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return paymentApiService.updatePayment(params.id, params.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getPayments");
    },

    ...options,
  });
};

export const useCreatePaymentMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return paymentApiService.createPayment(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getContracts");
    },
    ...options,
  });
};

export const useDeletePaymentMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return paymentApiService.deletePayment(params.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getContracts");
    },
    ...options,
  });
};
