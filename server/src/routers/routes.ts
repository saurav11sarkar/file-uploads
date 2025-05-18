import { Router } from "express";
import { imgRoutes } from "../modules/img.routes";
const router = Router();

router.use("/img", imgRoutes);

export default router;
