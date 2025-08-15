import { GoogleGenAI, Type } from "@google/genai";
import type { CodeAnalysis } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    technologies: {
      type: Type.ARRAY,
      description: "A list of technologies used in the website.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the technology, library, or framework." },
          category: { type: Type.STRING, description: "The category of the technology (e.g., Frontend Framework, Animation Library, 3D Graphics)." },
          reasoning: { type: Type.STRING, description: "A brief explanation for why this technology is likely used." },
        },
        required: ["name", "category", "reasoning"],
      },
    },
    structure: {
      type: Type.OBJECT,
      properties: {
        components: { type: Type.ARRAY, items: { type: Type.STRING } },
        stateManagement: { type: Type.STRING },
      },
    },
    logic: {
      type: Type.OBJECT,
      properties: {
        coreFunctionality: { type: Type.STRING },
        userInteractions: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
  },
};

export const analyzeUrl = async (url: string): Promise<CodeAnalysis> => {
  const prompt = `
    Analyze the website at the following URL: ${url}.
    Based on your knowledge of web development, infer the technologies, structure, and logic.
    Do not visit the URL. Instead, use your knowledge about the domain and common patterns for high-end interactive websites.
    Provide the analysis in a JSON format that adheres to the provided schema.
    - For 'technologies', provide a detailed list. For each technology, include its name, category, and a concise reasoning for why you believe it's being used.
    - For 'structure', describe the potential component breakdown and state management approach.
    - For 'logic', explain the core functionality and key user interactions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
        temperature: 0.2,
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as CodeAnalysis;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
