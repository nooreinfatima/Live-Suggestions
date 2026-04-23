import logger from "../utils/logger.js";

/**
 * Global error handler middleware.
 * Catches all unhandled errors and returns consistent JSON responses.
 */
export function errorHandler(err, req, res, _next) {
    logger.error("Unhandled error:", err.message);

    // Groq API errors
    if (err.status || err.statusCode) {
        const status = err.status || err.statusCode;
        return res.status(status).json({
            error: "API Error",
            message: err.message || "An error occurred with the Groq API.",
        });
    }

    // Multer file upload errors
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({
            error: "File Too Large",
            message: "Audio file exceeds the maximum size limit.",
        });
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
            error: "Bad Request",
            message: "Unexpected file field in upload.",
        });
    }

    // Default server error
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message || "Something went wrong.",
    });
}
