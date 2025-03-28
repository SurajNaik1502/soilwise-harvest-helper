import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SoilAnalysisResult } from "@/types/soil";

interface SoilAnalysisResultsProps {
  soilAnalysis: SoilAnalysisResult | null;
  isAnalyzing: boolean;
}

const SoilAnalysisResults: React.FC<SoilAnalysisResultsProps> = ({ soilAnalysis, isAnalyzing }) => {
  if (isAnalyzing) {
    return (
      <Card className="soil-card animate-pulse p-6">
        <h2 className="text-xl font-semibold text-soil-darkest mb-4">Soil Analysis</h2>
        <div className="h-6 w-32 bg-soil-light rounded-md mb-4"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-soil-light rounded-md"></div>
          <div className="h-4 w-full bg-soil-light rounded-md"></div>
          <div className="h-4 w-3/4 bg-soil-light rounded-md"></div>
        </div>
      </Card>
    );
  }

  if (!soilAnalysis) {
    return (
      <Card className="soil-card p-6">
        <h2 className="text-xl font-semibold text-soil-darkest mb-4">Soil Analysis</h2>
        <p className="text-center text-gray-600">No soil analysis data available. Upload an image to start.</p>
      </Card>
    );
  }

  return (
    <Card className="soil-card p-6 animate-grow">
      <h2 className="text-xl font-semibold text-soil-darkest mb-4">Soil Analysis Results</h2>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-soil-dark">Soil Type</h3>
        <p className="text-2xl font-bold text-soil-darkest">{soilAnalysis.soilType}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-soil-dark">Characteristics</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {soilAnalysis.characteristics.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-soil-dark">Suitable For</h3>
        <div className="flex flex-wrap gap-2">
          {soilAnalysis.suitable_for.map((crop, index) => (
            <Badge key={index} className="bg-soil text-white hover:bg-soil-dark">
              {crop}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SoilAnalysisResults;
