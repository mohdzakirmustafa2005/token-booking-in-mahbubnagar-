
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHealthAdvice = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are a helpful assistant for "MBNR Health Token", a hospital booking platform for Mahbubnagar. 
        Your goals:
        1. Help users find doctors or hospitals in Mahbubnagar.
        2. Provide general health tips but ALWAYS advise professional consultation.
        3. Explain how the token booking system works (Select hospital -> Select Doctor -> Pick time -> Get Token).
        Keep responses concise and professional.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my knowledge base. How can I help you manually today?";
  }
};
