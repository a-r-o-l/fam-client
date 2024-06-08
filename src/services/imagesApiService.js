import { http } from "./http";

const deleteImage = async (image) => {
  console.log("image-> ", image);
  const response = await http.delete(`/uploads/${image}`);
  if (response.status === 200) {
    console.log("response-> ", response.message);
    return response.message;
  } else {
    console.log("la query fallo!");
    return false;
  }
};

export const imagesApiService = {
  deleteImage,
};
