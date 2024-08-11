import { useQuery } from "@tanstack/react-query";
import { reservationsApiService } from "../../reservationsApiService";

export const useGetReservationQuery = (params, options) => {
  return useQuery({
    queryKey: ["getReservation", params.loungeId],
    queryFn: () => {
      return reservationsApiService.getReservation(params);
    },
    ...options,
  });
};

export const useGetReservationsQuery = (params, options) => {
  return useQuery({
    queryKey: ["getReservations"],
    queryFn: () => {
      return reservationsApiService.getReservations(params);
    },
    ...options,
  });
};
