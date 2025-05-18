import { imgService } from "./img.service";
import catchAsync from "../utils/catchAsycn";

const uploadImage = catchAsync(async (req, res) => {
  // const file = req.file as Express.Multer.File;
  const file = req.files as Express.Multer.File[];
  if (!file) {
    res.status(400).json({
      success: false,
      message: "No image file uploaded",
    });
    return;
  }

  const formData = JSON.parse(req.body.data);

  const result = await imgService.uploadImage(formData, file);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const imgController = { uploadImage };
