const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

export const uploadImageToImgBB = async (file) => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_IMGBB_API_KEY is missing");
  }

  const formData = new FormData();
  formData.append("key", apiKey);
  formData.append("image", file);

  const response = await fetch(IMGBB_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data?.success || !data?.data?.url) {
    throw new Error(data?.error?.message || "Image upload failed");
  }

  return data.data.url;
};
