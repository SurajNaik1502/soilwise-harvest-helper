import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const API_KEY = "AIzaSyCXS8cqy_sJSRRjAh5rW9Q1sToqigK_5Nw"; // Replace with your actual Gemini API Key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Function to analyze soil from an uploaded image
export async function analyzeSoil(imageFile: File): Promise<string | null> {
  try {
    const base64Image = await toBase64(imageFile);

    const imagePart: Part = {
      inlineData: {
        data: base64Image,
        mimeType: imageFile.type,
      },
    };

    const promptPart: Part = {
      text: `
        You are an expert agronomist. Analyze the given soil image and provide:
        - Soil Type (Clay, Loam, Sandy, etc.)
        - Characteristics
        - Suitable Crops
        - pH Range
        - Nutrient Levels (Nitrogen, Phosphorus, Potassium)
      `,
    };

    const response = await model.generateContent([promptPart, imagePart]);
    return response.response.text() || "No analysis available.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}

// Function to get crop recommendations based on soil analysis text
export async function recommendCrops(soilAnalysisText: string): Promise<string | null> {
  try {
    const prompt: Part = {
      text: `
        You are a crop expert. Based on the following soil analysis, suggest the **top 3 crops** that will grow best in this soil.
        
        **Soil Analysis:**
        ${soilAnalysisText}

        Also, provide a short explanation for why each crop is suitable.
      `,
    };

    const response = await model.generateContent([prompt]);
    return response.response.text() || "No recommendations available.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}

// Convert File to Base64
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString().split(",")[1] || "");
    reader.onerror = (error) => reject(error);
  });
}
