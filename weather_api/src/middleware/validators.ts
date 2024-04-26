import { param } from "express-validator";

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

export const validateCityName = param("city")
  .isString()
  .isIn(cities)
  .withMessage("City name must be one of the following: " + cities.join(", "));


// import { param } from "express-validator";

// /**
//  * Validates the city name param
//  * @returns {ValidationChain} - Express validator validation chain
//  * @example
//  * router.get(
//  *  "/:city",
//  * validateCityName,
//  * getWeatherData
//  * );
//  */
// export const validateCityName = param("city")
//   // We will use the isString method to check if the city param is a string
//   .isString()
//   // We will use the isIn method to check if the city param is either london or dublin
//   .isIn(["london", "dublin"])
//   // We will use the withMessage method to set a custom error message
//   .withMessage("City name must be either london or dublin");
