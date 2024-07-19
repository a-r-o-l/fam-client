import { useMutation } from "@tanstack/react-query";
import { accountApiService } from "../../accountApiService";

export const useUpdateAccountMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return accountApiService.updateAccount(params.accountId, params.data);
    },

    ...options,
  });
};

export const useCreateAccountMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return accountApiService.createAccount(params);
    },
    ...options,
  });
};
