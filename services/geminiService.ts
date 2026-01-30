import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

// Define the response schema for strict JSON output
const cocktailSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Chinese name of the cocktail" },
    nameEn: { type: Type.STRING, description: "English name of the cocktail" },
    mappingReason: { type: Type.STRING, description: "Why this cocktail fits this personality aspect" },
    base: { type: Type.STRING, description: "Base spirit" },
    ingredients: { type: Type.STRING, description: "Ingredients list" },
    method: { type: Type.STRING, description: "Preparation method" },
    abv: { type: Type.STRING, description: "Estimated ABV (e.g. 'Medium', '15%')" },
    tasteProfile: { type: Type.STRING, description: "Overall taste profile keywords" },
    visual: { type: Type.STRING, description: "Visual description" },
    smell: { type: Type.STRING, description: "Olfactory description" },
    taste: { type: Type.STRING, description: "Tasting notes (entry, body, finish)" },
    vibe: { type: Type.STRING, description: "Atmosphere description" },
    bartenderWhisper: { type: Type.STRING, description: "A short poetic comment" },
  },
  required: ["name", "nameEn", "mappingReason", "base", "ingredients", "method", "abv", "tasteProfile", "visual", "smell", "taste", "vibe", "bartenderWhisper"]
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    faceReading: { type: Type.STRING, description: "Overall impression of the face (warm/healing tone)" },
    socialMask: {
      type: Type.OBJECT,
      properties: {
        description: { type: Type.STRING, description: "Detailed analysis of the social mask" },
        traits: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 core traits of the social mask" }
      },
      required: ["description", "traits"]
    },
    trueEssence: {
      type: Type.OBJECT,
      properties: {
        description: { type: Type.STRING, description: "Detailed analysis of the true inner self" },
        traits: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 core traits of the inner self" }
      },
      required: ["description", "traits"]
    },
    outerCocktail: cocktailSchema,
    innerCocktail: cocktailSchema,
    closingMessage: { type: Type.STRING, description: "A warm, inspiring closing message" }
  },
  required: ["faceReading", "socialMask", "trueEssence", "outerCocktail", "innerCocktail", "closingMessage"]
};

const SYSTEM_INSTRUCTION = `
你是一位融合了面相学智慧和调酒艺术的神秘调酒师。你能够通过观察人的面部特征，洞察他们的性格双面：外在展现的社交形象与内在真实的自我，并为每一面调制专属鸡尾酒。

**重要原则**
1. **准确度与趣味性平衡**：基于面相特征合理推理，但保持趣味性和积极性。
2. **尊重个体**：避免负面标签，以欣赏和理解的视角看待每个人。
3. **酒款真实性**：推荐的鸡尾酒应该是真实存在的经典或知名酒款，或者基于经典款的合理特调。
4. **深度关联**：确保酒款与性格的关联有深度和说服力。
5. **语言美学**：使用优美、富有画面感的中文语言，营造复古、优雅、温馨而神秘的氛围。

**分析步骤**
1. **面相观察**：分析脸型、五官、轮廓、细节（眉眼鼻嘴）及整体气质。
2. **双面性格分析**：
   - **外在人格 (The Social Mask)**：社交形象，他人眼中的标签。
   - **内在自我 (The True Essence)**：独处状态，内心渴望与恐惧。
3. **调制专属鸡尾酒**：
   - 外在之酒：符合社交形象。
   - 内在之酒：反映真实内心，常有反差。

请基于上传的图片，按照JSON格式输出分析结果。
`;

export const analyzeImage = async (base64Image: string): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: "请分析这张面孔，并为我调制两杯鸡尾酒。"
          }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Slightly creative but grounded
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = error => reject(error);
  });
};