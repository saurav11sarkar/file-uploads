import { Router } from "express";
import uploadImg from "../middlewares/multer";
import { imgController } from "../modules/img.controller";

const router = Router();

// Use multer middleware before hitting imgRoutes
router.post("/upload", uploadImg("image"), imgController.uploadImage);

export const imgRoutes = router;