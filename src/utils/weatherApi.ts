
import { WeatherData } from "@/types/soil";
import { toast } from "sonner";

const API_KEY = "4f50c53e1b62b5816bb6d659872131fd"; // Free OpenWeatherMap API key

export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Weather data fetch failed");
    }
    
    const data = await response.json();
    
    // Format the data to match our WeatherData type
    const weatherData: WeatherData = {
      current: {
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        weather: data.weather.map((w: any) => ({
          description: w.description,
          icon: `https://openweathermap.org/img/wn/${w.icon}@2x.png`
        }))
      },
      historical: {
        // This would ideally come from historical data API
        // Using mock data for now
        avg_temp: data.main.temp - Math.random() * 5,
        avg_rainfall: 50 + Math.random() * 30,
        season: getCurrentSeason()
      }
    };
    
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast.error("Failed to fetch weather data. Please try again.");
    return null;
  }
}

function getCurrentSeason(): string {
  const month = new Date().getMonth();
  
  // Northern hemisphere seasons
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Fall";
  return "Winter";
}
