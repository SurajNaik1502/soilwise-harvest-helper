import React from "react";
import { Card } from "@/components/ui/card";
import { recommendCrops } from "@/utils/geminiApi";

interface CropRecommendationsProps {
  soilAnalysisText: string;
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ soilAnalysisText }) => {
  const [recommendations, setRecommendations] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    const result = await recommendCrops(soilAnalysisText);
    setRecommendations(result);
    setLoading(false);
  };

  React.useEffect(() => {
    if (soilAnalysisText) {
      fetchRecommendations();
    }
  }, [soilAnalysisText]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-soil-darkest mb-4">Crop Recommendations</h2>
      {loading ? (
        <p className="text-gray-600 animate-pulse">Fetching recommendations...</p>
      ) : recommendations ? (
        <p className="text-gray-700 whitespace-pre-line">{recommendations}</p>
      ) : (
        <p className="text-gray-500">No recommendations available.</p>
      )}
    </Card>
  );
};

export default CropRecommendations;
