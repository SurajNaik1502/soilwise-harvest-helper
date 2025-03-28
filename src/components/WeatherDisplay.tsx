
import React from 'react';
import { Card } from "@/components/ui/card";
import { WeatherData } from '@/types/soil';
import { CloudSun, CloudRain, Wind, Droplets } from 'lucide-react';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="soil-card animate-pulse p-6">
        <h2 className="text-xl font-semibold text-soil-darkest mb-4">Weather Information</h2>
        <div className="flex justify-center">
          <div className="h-32 w-32 bg-soil-light rounded-full animate-pulse"></div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="h-6 w-20 bg-soil-light rounded-md"></div>
          <div className="h-6 w-20 bg-soil-light rounded-md"></div>
        </div>
      </Card>
    );
  }
  
  if (!weatherData) {
    return (
      <Card className="soil-card p-6">
        <h2 className="text-xl font-semibold text-soil-darkest mb-4">Weather Information</h2>
        <div className="flex flex-col items-center justify-center h-40">
          <CloudSun className="h-16 w-16 text-soil mb-2" />
          <p className="text-gray-600">Weather data not available</p>
          <p className="text-sm text-gray-500">Please enable location services</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="soil-card p-6 animate-grow">
      <h2 className="text-xl font-semibold text-soil-darkest mb-4">Weather Information</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="current-weather text-center">
          <h3 className="text-lg font-medium text-soil-dark mb-2">Current Conditions</h3>
          
          <div className="flex items-center justify-center mb-2">
            {weatherData.current.weather[0]?.icon ? (
              <img 
                src={weatherData.current.weather[0].icon} 
                alt="Weather icon" 
                className="w-16 h-16"
              />
            ) : (
              <CloudSun className="w-16 h-16 text-soil-dark" />
            )}
          </div>
          
          <p className="text-2xl font-bold mb-1">{weatherData.current.temp.toFixed(1)}°C</p>
          <p className="text-gray-600 capitalize">{weatherData.current.weather[0]?.description || "Clear"}</p>
          
          <div className="flex justify-center gap-4 mt-3">
            <div className="flex items-center text-gray-600">
              <Wind className="w-4 h-4 mr-1" />
              <span className="text-sm">{weatherData.current.wind_speed} m/s</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Droplets className="w-4 h-4 mr-1" />
              <span className="text-sm">{weatherData.current.humidity}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-soil-light w-px h-28 hidden md:block"></div>
        
        <div className="historical-weather text-center">
          <h3 className="text-lg font-medium text-soil-dark mb-2">Seasonal Overview</h3>
          
          <div className="mb-2">
            {weatherData.historical?.season === "Winter" ? (
              <CloudRain className="w-12 h-12 mx-auto text-soil-dark" />
            ) : (
              <CloudSun className="w-12 h-12 mx-auto text-soil-dark" />
            )}
          </div>
          
          <p className="text-lg font-medium">{weatherData.historical?.season || "Summer"}</p>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p className="text-xs text-gray-500">Avg. Temp</p>
              <p className="text-sm font-medium">
                {weatherData.historical?.avg_temp.toFixed(1) || "--"}°C
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Rainfall</p>
              <p className="text-sm font-medium">
                {weatherData.historical?.avg_rainfall.toFixed(0) || "--"} mm
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherDisplay;
