// weatherController.ts
import { Request, Response } from "express";
import { generateWeatherData } from "../services/weatherService.js";
import { validationResult } from "express-validator";

const cities = [
  "london", "dublin", "washington", "paris", "berlin", "madrid", 
  "rome", "tokyo", "beijing", "sydney", "cairo", "moscow", 
  "lagos", "toronto", "mumbai", "jakarta", "seoul", "nairobi", 
  "lima", "bangkok", "athens", "vienna", "brussels", "helsinki", 
  "oslo", "lisbon", "stockholm", "budapest", "warsaw", "dubai", 
  "singapore", "hanoi", "manila", "riyadh", "santiago", "bogota", 
  "havana", "kingston", "tashkent", "tehran", "baghdad", "algiers", 
  "accra", "harare", "kampala", "dakar", "khartoum", "tunis"
];

export const getWeatherData = async (req: Request, res: Response) => {
  // We will use the validationResult function to check if there are any validation errors
  const errors = validationResult(req);

  // If there are validation errors, we will log them and send a 400 status code
  if (!errors.isEmpty()) {
    console.error("Validation error", errors.mapped());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  // We will use a try catch block to catch any errors
  try {
    // Get the city param from the request
    const { city } = req.params;
    const lowerCaseCity = city.toLowerCase();

    // We will create a variable with a type of WeatherData
    let finalWeatherData: WeatherData;

    // Check if the city is in our list of cities
    if (cities.includes(lowerCaseCity)) {
      finalWeatherData = generateWeatherData(lowerCaseCity);
    } else {
      // If the city is not recognized, we will throw an error
      res.status(404).send("City not found");
      return;
    }

    // We will return the weather data as JSON
    res.status(200).json(finalWeatherData);
  } catch (error) {
    // If there is an error, we will log it and send a 500 status code
    res.status(500).send("Error in fetching weather data");
  }
};

export const getThreeDayForecast = async (_: Request, res: Response) => {
  try {
    const forecasts = cities.map(city => generateWeatherData(city).threeDayForecast);
    res.status(200).json(forecasts);
  } catch (error) {
    res.status(500).send("Error in fetching three-day forecast");
  }
};
