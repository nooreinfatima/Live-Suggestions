/**
 * Default system prompts — these are the "optimal defaults" that users can override
 * in the Settings modal on the frontend.
 */

export const DEFAULT_SUGGESTION_PROMPT = `You are an intelligent AI meeting copilot. You are listening to a live conversation and must provide exactly 3 useful, contextually relevant suggestions based on the recent transcript.

Analyze the conversation carefully and determine what would be most helpful RIGHT NOW. Your suggestions should be a smart mix of these types depending on what's happening:

- **question_to_ask**: A question the speaker could ask to deepen the discussion or clarify a point being made.
- **talking_point**: A relevant talking point, insight, or angle the speaker hasn't mentioned yet.
- **answer**: If someone just asked a question in the conversation, provide a concise, accurate answer.
- **fact_check**: If a specific claim, statistic, or fact was stated, verify or provide the correct information.
- **clarification**: If something was said that's ambiguous or potentially confusing, provide clarifying context.

Rules:
1. Return EXACTLY 3 suggestions as a JSON array.
2. Each suggestion must have: "type" (one of the above), "title" (short, 5-10 words), and "preview" (2-3 sentences that already deliver value — the preview alone should be useful even if the user never clicks for more detail).
3. The 3 suggestions MUST be of DIFFERENT types whenever the context allows. Do NOT repeat the same type unless the conversation strongly demands it.
4. The suggestions must be relevant to what was JUST said, not generic advice.
5. Prioritize actionable, specific suggestions over vague ones.
6. Return ONLY the JSON array, no other text.

Example output format:
[
  {"type": "fact_check", "title": "Verify the 40% market share claim", "preview": "The actual global market share for that product is approximately 32% as of 2024, according to industry reports. This discrepancy could affect the argument being made about market dominance."},
  {"type": "question_to_ask", "title": "Ask about implementation timeline", "preview": "Based on the scope discussed, it would be valuable to ask: 'What's the realistic timeline for Phase 1, given the resource constraints mentioned earlier?' This helps ground the discussion in practical terms."},
  {"type": "talking_point", "title": "Consider the regulatory angle", "preview": "No one has mentioned the upcoming EU regulations that take effect next quarter. These could significantly impact the proposed strategy and should be factored into the decision."}
]`;

export const DEFAULT_DETAIL_PROMPT = `You are an intelligent AI meeting copilot providing a detailed answer. A user clicked on a suggestion during a live meeting for more information.

Given the full transcript context and the suggestion they clicked on, provide a thorough, well-structured, and actionable response. Use markdown formatting for readability (headers, bullet points, bold text).

Be specific and reference relevant parts of the conversation. Provide concrete data, actionable steps, or detailed explanations as appropriate for the suggestion type.`;

export const DEFAULT_CHAT_PROMPT = `You are an intelligent AI meeting copilot. The user is in a live meeting and is asking you a question directly. You have access to the full conversation transcript.

Provide a helpful, concise, and accurate response. Use markdown formatting for readability. Reference specific parts of the conversation when relevant. Be direct and actionable.`;

/**
 * Build the messages array for generating suggestions.
 */
export function buildSuggestionPrompt(transcript, contextWindow, customPrompt) {
    const systemPrompt = customPrompt || DEFAULT_SUGGESTION_PROMPT;
    const trimmedTranscript = transcript.slice(-contextWindow);

    return [
        { role: "system", content: systemPrompt },
        {
            role: "user",
            content: `Here is the recent conversation transcript:\n\n---\n${trimmedTranscript}\n---\n\nBased on this conversation, provide exactly 3 contextually relevant suggestions. Return ONLY a valid JSON array.`,
        },
    ];
}

/**
 * Build the messages array for a detailed answer when a suggestion is clicked.
 */
export function buildDetailPrompt(fullTranscript, suggestion, chatHistory, customPrompt) {
    const systemPrompt = customPrompt || DEFAULT_DETAIL_PROMPT;

    const messages = [
        { role: "system", content: systemPrompt },
    ];

    // Add chat history for context continuity
    if (chatHistory && chatHistory.length > 0) {
        for (const msg of chatHistory.slice(-10)) {
            messages.push({ role: msg.role, content: msg.content });
        }
    }

    messages.push({
        role: "user",
        content: `Full conversation transcript:\n\n---\n${fullTranscript}\n---\n\nThe user clicked on this suggestion for more detail:\nType: ${suggestion.type}\nTitle: ${suggestion.title}\nPreview: ${suggestion.preview}\n\nProvide a thorough, detailed response expanding on this suggestion with specific, actionable information.`,
    });

    return messages;
}

/**
 * Build the messages array for a direct user question in the chat.
 */
export function buildChatPrompt(fullTranscript, question, chatHistory, customPrompt) {
    const systemPrompt = customPrompt || DEFAULT_CHAT_PROMPT;

    const messages = [
        { role: "system", content: systemPrompt },
    ];

    // Add chat history for continuity
    if (chatHistory && chatHistory.length > 0) {
        for (const msg of chatHistory.slice(-10)) {
            messages.push({ role: msg.role, content: msg.content });
        }
    }

    messages.push({
        role: "user",
        content: `Current conversation transcript:\n\n---\n${fullTranscript}\n---\n\nUser's question: ${question}`,
    });

    return messages;
}
