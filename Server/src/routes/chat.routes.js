import { Router } from "express";
import { requireApiKey } from "../middlewares/apikey.middleware.js";
import { handleChat } from "../controllers/chat.controller.js";

const router = Router();

router.post("/", requireApiKey, handleChat);

export default router;
