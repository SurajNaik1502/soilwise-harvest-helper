
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import ResourcesQuestionnaire from '@/components/ResourcesQuestionnaire';
import WeatherDisplay from '@/components/WeatherDisplay';
import SoilAnalysisResults from '@/components/SoilAnalysisResults';
import CropRecommendations from '@/components/CropRecommendations';

import { SoilAnalysisResult, WeatherData, ResourcesData, CropRecommendation } from '@/types/soil';
import { analyzeSoilImage } from '@/utils/geminiApi';
import { fetchWeatherData } from '@/utils/weatherApi';
import { getTopCropRecommendations } from '@/utils/cropRecommendation';

const Index = () => {
  // State for the application
  const [soilImage, setSoilImage] = useState<string | null>(null);
  const [soilAnalysis, setSoilAnalysis] = useState<SoilAnalysisResult | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [resources, setResources] = useState<ResourcesData | null>(null);
  const [cropRecommendations, setCropRecommendations] = useState<CropRecommendation[] | null>(null);
  
  // Loading states
  const [isAnalyzingSoil, setIsAnalyzingSoil] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);
  
  // Get user's location and fetch weather data on component mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      setIsLoadingWeather(true);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherResponse = await fetchWeatherData(latitude, longitude);
          
          if (weatherResponse) {
            setWeatherData(weatherResponse);
          }
          
          setIsLoadingWeather(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your location. Weather data will not be available.");
          setIsLoadingWeather(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser. Weather data will not be available.");
    }
  }, []);
  
  // Generate crop recommendations when all required data is available
  useEffect(() => {
    if (soilAnalysis && weatherData && resources) {
      generateCropRecommendations();
    }
  }, [soilAnalysis, weatherData, resources]);
  
  // Handle soil image upload and analysis
  const handleImageUpload = async (base64Image: string) => {
    setSoilImage(base64Image);
    setIsAnalyzingSoil(true);
    
    try {
      const analysisResult = await analyzeSoilImage(base64Image);
      
      if (analysisResult) {
        setSoilAnalysis(analysisResult);
        toast.success("Soil analysis completed successfully!");
      } else {
        toast.error("Failed to analyze soil image. Please try again.");
      }
    } catch (error) {
      console.error("Error during soil analysis:", error);
      toast.error("An error occurred during soil analysis.");
    } finally {
      setIsAnalyzingSoil(false);
    }
  };
  
  // Handle resources questionnaire submission
  const handleResourcesUpdate = (resourcesData: ResourcesData) => {
    setResources(resourcesData);
  };
  
  // Generate crop recommendations based on all collected data
  const generateCropRecommendations = async () => {
    if (!soilAnalysis || !weatherData || !resources) {
      toast.error("Missing required data for crop recommendations.");
      return;
    }
    
    setIsGeneratingRecommendations(true);
    
    try {
      // Small delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const recommendations = getTopCropRecommendations(
        soilAnalysis,
        weatherData,
        resources
      );
      
      setCropRecommendations(recommendations);
      toast.success("Crop recommendations generated successfully!");
    } catch (error) {
      console.error("Error generating crop recommendations:", error);
      toast.error("Failed to generate crop recommendations.");
    } finally {
      setIsGeneratingRecommendations(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-soil-lightest">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-8 text-center shadow-sm border border-soil-light">
            <h1 className="text-3xl font-bold text-soil-darkest mb-2">SoilWise Harvest Helper</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload a soil image, share your available resources, and get personalized crop recommendations 
              based on soil analysis and local weather conditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ImageUploader 
              onImageCaptured={handleImageUpload} 
              isProcessing={isAnalyzingSoil} 
            />
            <ResourcesQuestionnaire onResourcesUpdate={handleResourcesUpdate} />
          </div>
          
          <div className="mb-8">
            <WeatherDisplay 
              weatherData={weatherData} 
              isLoading={isLoadingWeather} 
            />
          </div>
          
          <div className="mb-8">
            <SoilAnalysisResults 
              soilAnalysis={soilAnalysis} 
              isAnalyzing={isAnalyzingSoil}
            />
          </div>
          
          <div>
            <CropRecommendations 
              crops={cropRecommendations} 
              isLoading={isGeneratingRecommendations}
            />
          </div>
        </section>
      </main>
      
      <footer className="bg-white border-t border-soil-light py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SoilWise Harvest Helper • All soil analyses are indicative only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
