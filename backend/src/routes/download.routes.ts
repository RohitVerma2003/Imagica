import { Router } from "express";
import { downloadImage } from "../controllers/download.controller";

const router = Router();

router.get("/:jobId", downloadImage);

export default router;