
import React from 'react';
import { Card } from "@/components/ui/card";
import { CropRecommendation } from '@/types/soil';
import { Droplets, Clock, Leaf } from 'lucide-react';

interface CropRecommendationsProps {
  crops: CropRecommendation[] | null;
  isLoading: boolean;
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ crops, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="soil-card p-6 animate-pulse">
        <h2 className="text-xl font-semibold text-soil-darkest mb-4">Recommended Crops</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-soil-lightest rounded-lg p-4">
              <div className="h-32 w-full bg-soil-light rounded-md mb-3"></div>
              <div className="h-6 w-24 bg-soil-light rounded-md mb-2"></div>
              <div className="h-4 w-full bg-soil-light rounded-md mb-1"></div>
              <div className="h-4 w-full bg-soil-light rounded-md mb-1"></div>
              <div className="h-4 w-2/3 bg-soil-light rounded-md"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (!crops || crops.length === 0) {
    return (
      <Card className="soil-card p-6">
        <h2 className="text-xl font-semibold text-soil-darkest mb-4">Recommended Crops</h2>
        <div className="text-center py-8">
          <Leaf className="h-16 w-16 mx-auto text-soil mb-2" />
          <p className="text-gray-600 mb-2">No crop recommendations available</p>
          <p className="text-sm text-gray-500">Complete soil analysis and resource questionnaire first</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="soil-card p-6 animate-grow">
      <h2 className="text-xl font-semibold text-soil-darkest mb-4">Top 3 Recommended Crops</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {crops.map((crop, index) => (
          <div 
            key={index}
            className={`rounded-lg overflow-hidden border border-soil-light hover:shadow-md transition-shadow ${
              index === 0 ? 'bg-gradient-to-br from-soil-lightest to-soil-light' : 'bg-white'
            }`}
          >
            <div className="h-40 overflow-hidden">
              {crop.imageUrl ? (
                <img 
                  src={crop.imageUrl} 
                  alt={crop.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-soil-light">
                  <Leaf className="h-20 w-20 text-white" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-soil-darkest">{crop.name}</h3>
                {index === 0 && (
                  <span className="text-xs font-medium bg-soil-dark text-white px-2 py-0.5 rounded-full">
                    Top Pick
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{crop.description}</p>
              
              <div className="flex flex-wrap gap-3 text-xs font-medium">
                <div className="flex items-center text-soil-dark">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{crop.harvestTime}</span>
                </div>
                
                <div className="flex items-center text-soil-dark">
                  <Droplets className="w-3 h-3 mr-1" />
                  <span className="capitalize">{crop.waterNeeds} water</span>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-500">
                <span className="font-medium">Growing Season:</span> {crop.growingSeason}
              </div>
              
              <div className="mt-1 text-xs text-gray-500">
                <span className="font-medium">Difficulty:</span> {crop.difficultyLevel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CropRecommendations;
