
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SoilAnalysisResult } from '@/types/soil';

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
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 w-16 bg-soil-light rounded-full"></div>
          <div className="h-6 w-20 bg-soil-light rounded-full"></div>
          <div className="h-6 w-24 bg-soil-light rounded-full"></div>
        </div>
      </Card>
    );
  }
  
  if (!soilAnalysis) {
    return (
      <Card className="soil-card p-6">
        <h2 className="text-xl font-semibold text-soil-darkest mb-4">Soil Analysis</h2>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-2">No soil analysis data available</p>
          <p className="text-sm text-gray-500">Upload a soil image to begin analysis</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="soil-card p-6 animate-grow">
      <h2 className="text-xl font-semibold text-soil-darkest mb-4">Soil Analysis Results</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-soil-dark mb-1">Soil Type</h3>
        <p className="text-2xl font-bold text-soil-darkest">{soilAnalysis.soilType}</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-soil-dark mb-2">Characteristics</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {soilAnalysis.characteristics.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-soil-dark mb-2">Usually Suitable For</h3>
        <div className="flex flex-wrap gap-2">
          {soilAnalysis.suitable_for.map((crop, index) => (
            <Badge key={index} className="bg-soil text-white hover:bg-soil-dark">
              {crop}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <h3 className="text-xs font-medium text-gray-500">pH Range</h3>
          <p className="font-medium text-soil-dark">{soilAnalysis.ph_range}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500">Nitrogen</h3>
          <p className="font-medium text-soil-dark">{soilAnalysis.nutrients.nitrogen}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500">Phosphorus</h3>
          <p className="font-medium text-soil-dark">{soilAnalysis.nutrients.phosphorus}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500">Potassium</h3>
          <p className="font-medium text-soil-dark">{soilAnalysis.nutrients.potassium}</p>
        </div>
      </div>
    </Card>
  );
};

export default SoilAnalysisResults;
