import { Router } from "express";
import { requireApiKey } from "../middlewares/apikey.middleware.js";
import { handleSuggestions } from "../controllers/suggestion.controller.js";

const router = Router();

router.post("/", requireApiKey, handleSuggestions);

export default router;
