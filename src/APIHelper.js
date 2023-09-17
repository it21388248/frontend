// // APIHelper.js


// Define API base URL 
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

// Define API key 
const API_KEY = process.env.WEATHER_APP_API_KEY || "e5464675f9d481b04c981cb851d15413";

// Export the full API URL with the API key
export const API_URL = `${BASE_URL}?units=metric&appid=${API_KEY}`;