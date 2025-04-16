export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:3001/api/upload", {
    method: "POST",
    body: formData,
  });

  return response.json();
};
