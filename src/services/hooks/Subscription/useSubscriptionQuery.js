import { useQuery } from "@tanstack/react-query";
import { suscriptionsApiService } from "../../subscriptionsApiService";

export const useGetSubscriptionsQuery = (params, options) => {
  return useQuery({
    queryKey: ["getSubscriptions"],
    queryFn: () => {
      return suscriptionsApiService.getSubscriptions(params);
    },
    ...options,
  });
};
