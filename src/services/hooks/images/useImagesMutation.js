import { useMutation } from "@tanstack/react-query";
import { imagesApiService } from "../../imagesApiService";

export const useDeleteImageMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      return imagesApiService.deleteImage(params);
    },
    ...options,
  });
};
