/**
 * API Key middleware — validates that the user's Groq API key
 * is provided in the x-api-key header on every API request.
 */
export function requireApiKey(req, res, next) {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || typeof apiKey !== "string" || apiKey.trim().length === 0) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Groq API key is required. Set it in the Settings panel.",
        });
    }
    req.apiKey = apiKey.trim();
    next();
}
