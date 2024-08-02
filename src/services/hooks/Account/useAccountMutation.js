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

export const useCreatePasswordtMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return accountApiService.createPassword(
        params.accountId,
        params.password
      );
    },
    ...options,
  });
};

export const useUpdatePasswordtMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return accountApiService.updatePassword(
        params.accountId,
        params.password
      );
    },
    ...options,
  });
};

export const useCheckPasswordtMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return accountApiService.checkPassword(params.accountId, params.password);
    },

    ...options,
  });
};
