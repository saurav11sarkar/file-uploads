import upload from "../middlewares/upload";
import { IImg } from "./img.interface";
import Img from "./img.model";

interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: any;
}

const uploadImage = async (formData: Partial<IImg>, file: Express.Multer.File[]) => {
  if (!file) {
    throw new Error("No image file provided");
  }

  // const img = (await upload(file)) as CloudinaryUploadResult;
  const img = await Promise.all(
    file.map(async (file) => {
      return (await upload(file)) as CloudinaryUploadResult;
    })
  );
  const imageUrls = img.map((img) => img.secure_url);

  const result = await Img.create({ ...formData, image: imageUrls });
  return result;
};

export const imgService = {
  uploadImage,
};
