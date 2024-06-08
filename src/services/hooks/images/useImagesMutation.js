import { useMutation } from "@tanstack/react-query";
import { imagesApiService } from "../../imagesApiService";

export const useDeleteImageMutation = (params, options) => {
  return useMutation({
    mutationFn: (params) => {
      console.log("params-> ", params);
      return imagesApiService.deleteImage(params);
    },
    ...options,
  });
};
