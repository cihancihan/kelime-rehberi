import { GoogleGenAI } from '@google/genai';
import { useSettingsStore } from '../hooks/useSettingsStore';

let aiInstance: GoogleGenAI | null = null;
let currentApiKey: string | null = null;

export async function generateNewSentence(wordEn: string, wordTr: string): Promise<{ en: string, tr: string } | null> {
  const settingsKey = useSettingsStore.getState().apiKey;
  const envKey = process.env.GEMINI_API_KEY;
  const activeKey = settingsKey || envKey;

  if (!activeKey) {
      console.error("Gemini API key is required. Make sure to set it in settings or environment variables.");
      return null;
  }
  
  if (!aiInstance || currentApiKey !== activeKey) {
      aiInstance = new GoogleGenAI({ apiKey: activeKey });
      currentApiKey = activeKey;
  }
  
  try {
    const prompt = `You are an English language teacher giving an IELTS vocabulary example.
    Word in English: ${wordEn}
    Word in Turkish: ${wordTr}
    
    Generate a completely new valid example sentence in English using this word in an IELTS context.
    Then, provide the exact Turkish translation of that sentence.
    
    Respond STRICTLY in JSON format without any markdown wrappers or markdown ticks.
    Format: {"en": "English sentence...", "tr": "Turkish sentence..."}`;

    const response = await aiInstance.models.generateContent({
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
