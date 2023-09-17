import {
  faSun,
  faCloud,
  faSmog,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
export const REFRESH_INTERVAL = 5 * 60 * 1000
//5 * 60 * 1000; // 5 minutes in milliseconds

// Define a constant for the meters to kilometers conversion factor
export const METERS_TO_KILOMETERS = 0.001;
export const MILLISECONDS_TO_SECONDS = 1000;

export const API_KEY = "e5464675f9d481b04c981cb851d15413";

// Define predefined colors for each city
export const predefinedColors = [
  "#5ba8f5",
  "#5e5beb",
  "#3bd975",
  "#d9823b",
  "#c44039",
  "#68158f",
  "#838f15",
  "#c23e5b",
];

// Define predefined weather icons for each city
export const weatherIcons = {
  "01d": faSun,
  "01n": faSun,
  "02d": faCloud,
  "02n": faCloud,
  "03d": faCloud, 
  "03n": faCloud, 
  "04d": faCloud,
  "04n": faCloud,
  "50d": faWind,
  "50n": faWind,
};

export const defaultWeatherIcon = faSmog;

export const getWeatherIcon = (iconCode) => {
  return weatherIcons[iconCode] || defaultWeatherIcon;
};
