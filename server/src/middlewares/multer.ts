import multer from "multer";

const uploadImg = (fieldName: string) => {
  // return multer({ storage: multer.memoryStorage() }).single(fieldName);
  return multer({ storage: multer.memoryStorage() }).array(fieldName);
};

export default uploadImg;
