import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateNewSentence(wordEn: string, wordTr: string): Promise<{ en: string, tr: string } | null> {
  if (!process.env.GEMINI_API_KEY) {
      console.error("Gemini API key is required");
      return null;
  }
  
  try {
    const prompt = `You are an English language teacher giving an IELTS vocabulary example.
    Word in English: ${wordEn}
    Word in Turkish: ${wordTr}
    
    Generate a completely new valid example sentence in English using this word in an IELTS context.
    Then, provide the exact Turkish translation of that sentence.
    
    Respond STRICTLY in JSON format without any markdown wrappers or markdown ticks.
    Format: {"en": "English sentence...", "tr": "Turkish sentence..."}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
          responseMimeType: "application/json"
      }
    });

    const json = JSON.parse(response.text?.trim() || "{}");
    if (json && json.en && json.tr) {
        return json;
    }
    return null;
  } catch (error) {
    console.error("Error generating sentence:", error);
    return null;
  }
}
