import express from "express";
import cors from "cors";
import { PORT } from "./src/config/env.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import logger from "./src/utils/logger.js";

// Route imports
import healthRoutes from "./src/routes/health.routes.js";
import transcriptionRoutes from "./src/routes/transcription.routes.js";
import suggestionRoutes from "./src/routes/suggestion.routes.js";
import chatRoutes from "./src/routes/chat.routes.js";

const app = express();

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// --------------- Routes ---------------
app.use("/api/health", healthRoutes);
app.use("/api/transcribe", transcriptionRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/chat", chatRoutes);

// --------------- Error handler ---------------
app.use(errorHandler);

// --------------- Start ---------------
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;
