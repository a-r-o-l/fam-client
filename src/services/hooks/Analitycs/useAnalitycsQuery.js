import { useQuery } from "@tanstack/react-query";
import { analitycsApiService } from "../../analitycsApiService";

export const useAnalitycsQuery = (params, options) => {
  return useQuery({
    queryKey: ["getAnalitycs"],
    queryFn: () => {
      return analitycsApiService.getAnalitycs(params);
    },
    ...options,
  });
};
