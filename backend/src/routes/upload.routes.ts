import { Router } from "express";
import { upload } from "../config/multer";
import { uploadImage } from "../controllers/upload.controller";
import { validateImageRequest } from "../middleware/validation.middleware";
import { uploadLimiter } from "../middleware/ratelimit.middleware";

const router = Router();

router.post("/", uploadLimiter, upload.single("image"), validateImageRequest, uploadImage);

export default router;