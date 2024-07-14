import { http } from "./http";

const deleteImage = async (image) => {
  const response = await http.delete(`/uploads/${image}`);
  if (response.status === 200) {
    return response.message;
  } else {
    return false;
  }
};

export const imagesApiService = {
  deleteImage,
};
