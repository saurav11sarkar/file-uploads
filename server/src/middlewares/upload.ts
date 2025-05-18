import cloudinary from "../config/cloudanary.config";
import streamifier from "streamifier";

const upload = (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        folder: "images",
        resource_type: "auto",
        transformation: {
          width: 500,
          height: 500,
          crop: "limit",
        },
        public_id: `${Date.now()}-${file.originalname}`,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export default upload;
