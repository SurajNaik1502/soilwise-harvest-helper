
import { CropRecommendation, ResourcesData, SoilAnalysisResult, WeatherData } from "@/types/soil";

export function getTopCropRecommendations(
  soilAnalysis: SoilAnalysisResult,
  weatherData: WeatherData,
  resources: ResourcesData
): CropRecommendation[] {
  // Create a larger pool of potential crops
  const allCrops: CropRecommendation[] = [
    {
      name: "Tomatoes",
      description: "Versatile fruit that thrives in warm conditions with consistent moisture.",
      growingSeason: "Spring to Fall",
      waterNeeds: "Medium",
      soilCompatibility: ["Loamy Soil", "Sandy Soil", "Clay Soil"],
      difficultyLevel: "Easy",
      harvestTime: "60-100 days",
      imageUrl: "https://images.unsplash.com/photo-1592924357228-91517b9b799a?q=80&w=300"
    },
    {
      name: "Carrots",
      description: "Root vegetable that prefers loose, well-drained soil without stones.",
      growingSeason: "Spring, Fall",
      waterNeeds: "Medium",
      soilCompatibility: ["Sandy Soil", "Loamy Soil"],
      difficultyLevel: "Easy",
      harvestTime: "70-80 days",
      imageUrl: "https://images.unsplash.com/photo-1598170845053-15e26f21c065?q=80&w=300"
    },
    {
      name: "Lettuce",
      description: "Leafy vegetable that grows quickly in cool weather with consistent moisture.",
      growingSeason: "Spring, Fall",
      waterNeeds: "Medium",
      soilCompatibility: ["Loamy Soil", "Silty Soil"],
      difficultyLevel: "Easy",
      harvestTime: "45-60 days",
      imageUrl: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?q=80&w=300"
    },
    {
      name: "Potatoes",
      description: "Starchy tuber that grows well in loose, acidic soil with good drainage.",
      growingSeason: "Spring",
      waterNeeds: "Medium",
      soilCompatibility: ["Sandy Soil", "Loamy Soil"],
      difficultyLevel: "Moderate",
      harvestTime: "70-120 days",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=300"
    },
    {
      name: "Peppers",
      description: "Warm-season crop that requires full sun and consistent moisture.",
      growingSeason: "Summer",
      waterNeeds: "Medium",
      soilCompatibility: ["Loamy Soil", "Sandy Soil"],
      difficultyLevel: "Moderate",
      harvestTime: "60-90 days",
      imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=300"
    },
    {
      name: "Cucumbers",
      description: "Vining crop that prefers warm weather and consistent moisture.",
      growingSeason: "Summer",
      waterNeeds: "High",
      soilCompatibility: ["Loamy Soil", "Sandy Soil"],
      difficultyLevel: "Easy",
      harvestTime: "50-70 days",
      imageUrl: "https://images.unsplash.com/photo-1589621316382-008455b857cd?q=80&w=300"
    },
    {
      name: "Blueberries",
      description: "Perennial fruit that requires acidic soil and consistent moisture.",
      growingSeason: "Spring to Summer",
      waterNeeds: "Medium",
      soilCompatibility: ["Peaty Soil", "Sandy Soil"],
      difficultyLevel: "Moderate",
      harvestTime: "2-3 years to mature",
      imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=300"
    },
    {
      name: "Onions",
      description: "Root vegetable that prefers well-drained soil and full sun.",
      growingSeason: "Spring",
      waterNeeds: "Low",
      soilCompatibility: ["Loamy Soil", "Sandy Soil"],
      difficultyLevel: "Easy",
      harvestTime: "90-120 days",
      imageUrl: "https://images.unsplash.com/photo-1518977956812-cd3e37e57abd?q=80&w=300"
    },
    {
      name: "Cabbage",
      description: "Leafy vegetable that prefers cool weather and moisture-retentive soil.",
      growingSeason: "Spring, Fall",
      waterNeeds: "Medium",
      soilCompatibility: ["Clay Soil", "Loamy Soil"],
      difficultyLevel: "Moderate",
      harvestTime: "70-120 days",
      imageUrl: "https://images.unsplash.com/photo-1594282486552-05a623371c15?q=80&w=300"
    },
    {
      name: "Radishes",
      description: "Fast-growing root vegetable that prefers loose, well-drained soil.",
      growingSeason: "Spring, Fall",
      waterNeeds: "Medium",
      soilCompatibility: ["Sandy Soil", "Loamy Soil"],
      difficultyLevel: "Easy",
      harvestTime: "21-30 days",
      imageUrl: "https://images.unsplash.com/photo-1587137281703-c7cd6a895ff9?q=80&w=300"
    }
  ];
  
  // Filter crops based on soil compatibility
  let compatibleCrops = allCrops.filter(crop => 
    crop.soilCompatibility.includes(soilAnalysis.soilType)
  );
  
  // If no directly compatible crops, return some general recommendations
  if (compatibleCrops.length < 3) {
    compatibleCrops = allCrops.slice(0, 5);
  }
  
  // Score each crop based on multiple factors
  const scoredCrops = compatibleCrops.map(crop => {
    let score = 0;
    
    // Soil compatibility score
    if (crop.soilCompatibility.includes(soilAnalysis.soilType)) {
      score += 5;
    }
    
    // Water needs vs availability
    const waterScore = {
      'Low': { 'Low': 3, 'Medium': 4, 'High': 5 },
      'Medium': { 'Low': 2, 'Medium': 4, 'High': 4 },
      'High': { 'Low': 1, 'Medium': 3, 'High': 5 }
    };
    score += waterScore[crop.waterNeeds][resources.waterAvailability] || 0;
    
    // Season appropriateness
    const currentSeason = weatherData.historical?.season || "Summer";
    if (crop.growingSeason.includes(currentSeason)) {
      score += 3;
    }
    
    // Experience level appropriateness
    const difficultyScore = {
      'Easy': { 'Beginner': 5, 'Intermediate': 3, 'Advanced': 1 },
      'Moderate': { 'Beginner': 2, 'Intermediate': 4, 'Advanced': 3 },
      'Difficult': { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 5 }
    };
    score += difficultyScore[crop.difficultyLevel][resources.experience] || 0;
    
    // Land size appropriateness
    // Some crops need more space than others
    const spaceNeeds = {
      'Potatoes': 'Large', 
      'Cabbage': 'Medium',
      'Cucumbers': 'Medium',
      'Blueberries': 'Large',
      'Tomatoes': 'Medium',
      'Radishes': 'Small',
      'Lettuce': 'Small',
      'Carrots': 'Small',
      'Peppers': 'Medium',
      'Onions': 'Small'
    };
    
    const landScore = {
      'Small': { 'Small': 5, 'Medium': 3, 'Large': 1 },
      'Medium': { 'Small': 2, 'Medium': 5, 'Large': 4 },
      'Large': { 'Small': 1, 'Medium': 3, 'Large': 5 }
    };
    
    const cropSpaceNeed = spaceNeeds[crop.name as keyof typeof spaceNeeds] || 'Medium';
    score += landScore[cropSpaceNeed][resources.landSize] || 0;
    
    return { crop, score };
  });
  
  // Sort by score and return top 3
  return scoredCrops
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.crop);
}
