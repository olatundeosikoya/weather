// service.ts
import { faker } from "@faker-js/faker";
import { storeWeatherData } from "../helpers/helper.js"; // import the function

export const generateWeatherData = (city: string): WeatherData => {
  // Generate random weather data
  const generatedWeatherData: WeatherData = {
    city,
    temperature: faker.number.int({ min: 1, max: 30 }),
    humidity: faker.number.int({ min: 79, max: 86 }),
    wind: faker.number.int({ min: 2, max: 78 }),
    rain: faker.number.int({ min: 65, max: 75 }),
    threeDayForecast: {
      temperature: {
        dayOne: faker.number.int({ min: -15, max: 30 }),
        dayTwo: faker.number.int({ min: -15, max: 30 }),
        dayThree: faker.number.int({ min: -15, max: 30 }),
      },
      humidity: {
        dayOne: faker.number.int({ min: 79, max: 86 }),
        dayTwo: faker.number.int({ min: 79, max: 86 }),
        dayThree: faker.number.int({ min: 79, max: 86 }),
      },
      wind: {
        dayOne: faker.number.int({ min: 2, max: 78 }),
        dayTwo: faker.number.int({ min: 2, max: 78 }),
        dayThree: faker.number.int({ min: 2, max: 78 }),
      },
      rain: {
        dayOne: faker.number.int({ min: 65, max: 75 }),
        dayTwo: faker.number.int({ min: 65, max: 75 }),
        dayThree: faker.number.int({ min: 65, max: 75 }),
      },
    },
  };

  // Store the generated weather data
  storeWeatherData(generatedWeatherData).catch(console.error);

  // Return weather data
  return generatedWeatherData;
};
