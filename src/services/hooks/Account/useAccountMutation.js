import { useMutation } from "@tanstack/react-query";
import { accountApiService } from "../../accountApiService";

export const useUpdateAccountMutation = (params, options) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return accountApiService.updateAccount(params.accountId, params.data);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries("getPayments");
    // },

    ...options,
  });
};
