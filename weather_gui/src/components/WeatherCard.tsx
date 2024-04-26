import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { getWeatherData, getSeismicData } from "../api/actions";
import ForecastCard from "./ForecastCard";

const WeatherCard: React.FC = () => {
  const [data, setData] = useState<WeatherData>();
  const [seismicData, setSeismicData] = useState<SeismicData>();
  const [loadingState, setLoadingState] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const cities = [
    "london", "dubalin", "washington", "paris", "berlin", "madrid", 
    "rome", "tokyo", "beijing", "sydney", "cairo", "moscow", 
    "lagos", "toronto", "mumbai", "jakarta", "seoul", "nairobi", 
    "lima", "bangkok", "athens", "vienna", "brussels", "helsinki", 
    "oslo", "lisbon", "stockholm", "budapest", "warsaw", "dubai", 
    "singapore", "hanoi", "manila", "riyadh", "santiago", "bogota", 
    "havana", "kingston", "tashkent", "tehran", "baghdad", "algiers", 
    "accra", "harare", "kampala", "dakar", "khartoum", "tunis"
  ];  

  const handleSearch = () => {
    console.log("Fetching Weather Data...");
    console.log(city);
    setLoadingState(true);
    getWeatherData(city)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });

    console.log("Fetching Seismic Data...");
    getSeismicData(city)
      .then((res) => {
        setSeismicData(res);
      })
      .catch((error) => {
        console.error(error);
        setSeismicData(undefined);
      });
       // Set citySelected to true when a city is searched
      setSearchClicked(true);
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex justify-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
            // Reset the select element to show the prompt again
            (document.getElementById("cityname") as HTMLSelectElement).selectedIndex = 0;
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <select
              id="cityname"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              {/* Change the default option text based on whether the search button has been clicked */}
              <option value="">{searchClicked ? "Select another city" : "Select a city"}</option>
              {cities.map((city) => (
                // Capitalize the first letter of each city name for display, but keep the value in lowercase
                <option key={city} value={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>
              ))}
            </select>
            <Button
              className="p-1 max-w-[150px] mx-auto"
              color="primary"
              isLoading={loadingState}
              type="submit"
              disabled={!city}
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">{data.city.charAt(0).toUpperCase() + data.city.slice(1)}</h1>
          <p className="text-sm text-gray-500">Today</p>
          {data.temperature > 20 ? (
            <div>
              <TiWeatherSunny className="w-36 h-36" />
            </div>
          ) : (
            <div>
              <TiWeatherDownpour className="w-36 h-36" />
            </div>
          )}
          <p className="text-3xl font-bold">{data.temperature}°C</p>
          <p className="text-lg">Humidity: {data.humidity}%</p>
          <p className="text-lg">Wind: {data.wind} km/h</p>
          <p className="text-lg">Rain: {data.rain} %</p>
          <Divider className="mt-3" />
      
          <p className="text-lg font-bold mt-2">Temperature Estimates</p>
          <div className="flex justify-around">
            <ForecastCard day="Day Two" temperature={data.threeDayForecast.temperature.dayOne} />
            <ForecastCard day="Day Three" temperature={data.threeDayForecast.temperature.dayTwo} />
            <ForecastCard day="Day Four" temperature={data.threeDayForecast.temperature.dayThree} />
          </div>
          <Divider className="mt-3" />
      
          <p className="text-lg font-bold mt-2">Humidity Estimates</p>
          <div className="flex justify-around">
            <ForecastCard day="Day Two" humidity={data.threeDayForecast.humidity.dayOne} />
            <ForecastCard day="Day Three" humidity={data.threeDayForecast.humidity.dayTwo} />
            <ForecastCard day="Day Four" humidity={data.threeDayForecast.humidity.dayThree} />
          </div>
          <Divider className="mt-3" />
      
          <p className="text-lg font-bold mt-2">Wind Estimates</p>
          <div className="flex justify-around">
            <ForecastCard day="Day Two" wind={data.threeDayForecast.wind.dayOne} />
            <ForecastCard day="Day Three" wind={data.threeDayForecast.wind.dayTwo} />
            <ForecastCard day="Day Four" wind={data.threeDayForecast.wind.dayThree} />
          </div>
          <Divider className="mt-3" />
      
          <p className="text-lg font-bold mt-2">Rain Estimates</p>
          <div className="flex justify-around">
            <ForecastCard day="Day Two" rain={data.threeDayForecast.rain.dayOne} />
            <ForecastCard day="Day Three" rain={data.threeDayForecast.rain.dayTwo} />
            <ForecastCard day="Day Four" rain={data.threeDayForecast.rain.dayThree} />
          </div>
        </div>
      </CardBody>
      
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Weather Estimates</p>
          </div>
        </CardBody>
      )}
      <Divider />
      {seismicData ? (
        <CardBody>
          <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Seismic Data</h1>
            <p className="text-lg">Magnitude: <span style={{color: 'blue'}}>{seismicData.magnitude}</span></p>
            <p className="text-lg">Latitude: <span style={{color: 'blue'}}>{seismicData.latitude}</span></p>
            <p className="text-lg">Longitude: <span style={{color: 'blue'}}>{seismicData.longitude}</span></p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
  <div className="flex items-left">
    {!searchClicked ? (
      <>
        <img src="src/components/icons8-rain.gif" alt="Rain Cloud" className="w-24 h-24" />
        <img src="src/components/icons8-rain.gif" alt="Rain Cloud" className="w-24 h-24" />
        <img src="src/components/icons8-rain.gif" alt="Rain Cloud" className="w-24 h-24" />
      </>
    ) : (
      <p className="text-xl font-bold text-center overflow-hidden overflow-ellipsis max-h-[5em]">
        No seismic data available for {city.charAt(0).toUpperCase() + city.slice(1)}
      </p>
    )}
  </div>
</CardBody>

      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs text-center text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
