export const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "Image upload failed");
    }

    const data = await res.json();
    return data.data.display_url; 
  } catch (err) {
    console.error("Image Upload Error:", err);
    throw err;
  }
};
