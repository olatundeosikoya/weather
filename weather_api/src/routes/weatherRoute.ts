import express from "express";
import { getWeatherData, getThreeDayForecast } from "../controllers/weatherController.js";
import { validateCityName } from "../middleware/validators.js";

// We will create a router object
const router = express.Router();

// Add the new route for the three-day forecast
router.get("/forecast", getThreeDayForecast);

// We will create a route for the weather data based on the city name
router.get("/:city", validateCityName, getWeatherData);

// We will export the router
export default router;
