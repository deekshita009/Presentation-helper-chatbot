import { GoogleGenAI, Type } from "@google/genai";
import { PresentationData } from "../types";

const SYSTEM_INSTRUCTION = `
You are SlideGenius, a world-class presentation assistant and coach. 
Your persona is professional, encouraging, and highly organized.
You are helping users build presentations, find templates, and refine their delivery.

CAPABILITIES:
1. Provide content, structure, and strategies for presentations.
2. Critique presentation ideas.
3. Suggest visual styles (e.g., "Minimalist Dark", "Corporate Blue").
4. GENERATE DOWNLOADABLE PRESENTATIONS.

IMPORTANT RULES FOR OUTPUT:
- If the user asks for advice, text content, or tips, reply in standard Markdown text. Use bolding for emphasis and lists for structure.
- If the user EXPLICITLY asks to "download", "create a file", "make a ppt", or "generate a presentation" that they can use:
  - You MUST return a JSON object strictly matching the schema below.
  - Do NOT wrap the JSON in markdown code blocks (like \`\`\`json). Return raw JSON if possible, or I will strip it.
  - The JSON must have a 'topic', and an array of 'slides'. Each slide has 'title', 'content' (array of strings), and 'speakerNotes'.
  - Create at least 5-7 slides for a full presentation request unless specified otherwise.
  - Ensure the content is substantive and ready for a slide deck.

SCHEMA FOR PPT GENERATION (Do not use this for general chat, only for generation requests):
{
  "topic": "string",
  "slides": [
    {
      "title": "string",
      "content": ["bullet point 1", "bullet point 2"],
      "speakerNotes": "string"
    }
  ]
}
`;

// Helper to determine if we should force JSON mode based on user prompt
// In a more complex app, we might use Function Calling, but for this simpler flow, 
// we will detect intent and prompt the model accordingly or parse the output.
// However, the cleanest way with the new SDK is to use responseSchema if we are 100% sure,
// but since we mix chat and tools, we will use a System Instruction to guide the model 
// and try to parse JSON from the response if it looks like JSON.

export const streamGeminiResponse = async (
  history: { role: string; parts: { text: string }[] }[],
  lastUserMessage: string,
  onChunk: (text: string) => void,
  onComplete: (fullText: string, pptData?: PresentationData) => void
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // We don't use 'chat.sendMessageStream' with full history here to keep it simple and stateless 
  // regarding the SDK's chat object, but we reconstruct history for the model.
  // Actually, let's use the chat model for better context.
  
  const chatHistory = history.map(h => ({
    role: h.role,
    parts: h.parts
  }));

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7, 
    },
    history: chatHistory
  });

  try {
    const resultStream = await chat.sendMessageStream({ message: lastUserMessage });
    
    let fullText = "";
    
    for await (const chunk of resultStream) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        onChunk(fullText);
      }
    }

    // Attempt to parse PPT Data if it looks like JSON and contains "slides"
    let pptData: PresentationData | undefined;
    const trimmed = fullText.trim();
    
    // Simple heuristic to detect if the model obeyed the JSON command
    // Often models wrap in ```json ... ```
    let jsonString = trimmed;
    if (trimmed.includes("```json")) {
        jsonString = trimmed.replace(/```json/g, "").replace(/```/g, "");
    } else if (trimmed.includes("```")) {
        jsonString = trimmed.replace(/```/g, "");
    }

    if (jsonString.trim().startsWith("{") && jsonString.includes('"slides"')) {
      try {
        const parsed = JSON.parse(jsonString.trim());
        if (parsed.slides && Array.isArray(parsed.slides)) {
            pptData = parsed as PresentationData;
            // Clean up the text displayed to the user so they don't just see raw JSON
            fullText = `I've generated a presentation on **"${parsed.topic}"** for you. \n\nYou can download it using the button below.`;
        }
      } catch (e) {
        console.warn("Found JSON-like structure but failed to parse:", e);
      }
    }

    onComplete(fullText, pptData);

  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("I apologize, but I encountered an error while processing your request. Please try again.");
    onComplete("Error", undefined);
  }
};