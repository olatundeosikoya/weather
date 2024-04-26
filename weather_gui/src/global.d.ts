// global.d.ts
interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
  threeDayForecast: {
    temperature: {
      dayOne: number;
      dayTwo: number;
      dayThree: number;
    };
    humidity: {
      dayOne: number;
      dayTwo: number;
      dayThree: number;
    };
    wind: {
      dayOne: number;
      dayTwo: number;
      dayThree: number;
    };
    rain: {
      dayOne: number;
      dayTwo: number;
      dayThree: number;
    };
  };
}

interface SeismicData {
  id: string;
  magnitude: number;
  latitude: string;
  longitude: string;
}
