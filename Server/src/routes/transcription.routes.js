import { Router } from "express";
import multer from "multer";
import { requireApiKey } from "../middlewares/apikey.middleware.js";
import { handleTranscription } from "../controllers/transcription.controller.js";

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max
});

router.post("/", requireApiKey, upload.single("audio"), handleTranscription);

export default router;
