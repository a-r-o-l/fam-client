const resizeImage = (file, maxWidth, maxHeight) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, file.type || "image/png", 0.95);
    };
    img.onerror = reject;
  });

export const uploadImage = async (img, token, isAvatar = true) => {
  let imgData;
  if (isAvatar) {
    imgData = await resizeImage(img, 150, 150);
  } else {
    imgData = img;
  }
  const imageData = new FormData();
  imageData.append("image", imgData);
  const response = await fetch(
    "https://fam-api-production.up.railway.app/uploads",
    {
      method: "POST",
      body: imageData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData = await response.json();
  if (responseData) {
    return responseData;
  } else {
    return null;
  }
};
