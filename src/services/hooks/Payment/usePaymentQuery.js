import { useQuery } from "@tanstack/react-query";
import { paymentApiService } from "../../paymentApiService";

export const useGetPaymentQuery = (params, options) => {
  return useQuery({
    queryKey: ["getPayments"],
    queryFn: () => {
      return paymentApiService.getPayments(params);
    },
    ...options,
  });
};
