
export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
    weather: {
      description: string;
      icon: string;
    }[];
  };
  historical?: {
    avg_temp: number;
    avg_rainfall: number;
    season: string;
  };
}

export interface ResourcesData {
  waterAvailability: 'Low' | 'Medium' | 'High';
  landSize: 'Small' | 'Medium' | 'Large';
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  equipmentAccess: 'Limited' | 'Moderate' | 'Extensive';
  laborAvailability: 'Low' | 'Medium' | 'High';
}

export interface SoilAnalysisResult {
  soilType: string;
  characteristics: string[];
  suitable_for: string[];
  ph_range: string;
  nutrients: {
    nitrogen: 'Low' | 'Medium' | 'High';
    phosphorus: 'Low' | 'Medium' | 'High';
    potassium: 'Low' | 'Medium' | 'High';
  };
}

export interface CropRecommendation {
  name: string;
  description: string;
  growingSeason: string;
  waterNeeds: 'Low' | 'Medium' | 'High';
  soilCompatibility: string[];
  difficultyLevel: 'Easy' | 'Moderate' | 'Difficult';
  harvestTime: string;
  imageUrl?: string;
}
