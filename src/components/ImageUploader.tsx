import React, { useState } from "react";
import { analyzeSoil } from "@/utils/geminiApi";

const ImageUploader: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const result = await analyzeSoil(file);
    setAnalysisResult(result);
    setIsUploading(false);
  };

  return (
    <div className="p-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {isUploading && <p>Analyzing soil...</p>}
      {analysisResult && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold">Soil Analysis Result</h2>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
