import { useMutation } from "@tanstack/react-query";
import { accountApiService } from "../../accountApiService";

export const useLoginMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return accountApiService.createSession(params);
    },
    ...options,
  });
};
