import { instanceAxios } from "@/lib/instantceAxios";

export const cloudinaryApi = {
  async singleFileUpload(width: number, height: number, formData: FormData) {
    const response = await instanceAxios.post(
      `/cloudinary/upload?width=${width}&height=${height}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};
