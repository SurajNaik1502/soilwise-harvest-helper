import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const API_KEY = "AIzaSyCXS8cqy_sJSRRjAh5rW9Q1sToqigK_5Nw"; // Replace with your Gemini API Key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function analyzeSoil(imageFile: File): Promise<string | null> {
  try {
    // Convert image to Base64
    const base64Image = await toBase64(imageFile);

    // Define the input parts for Gemini API
    const imagePart: Part = {
      inlineData: {
        data: base64Image,
        mimeType: imageFile.type, // Correct placement of mimeType
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

    // Send request to Gemini API
    const response = await model.generateContent([promptPart, imagePart]);

    return response.response.text() || "No analysis available.";
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
