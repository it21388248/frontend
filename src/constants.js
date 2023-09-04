import {
  faSun,
  faCloud,
  faWind,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

export const API_KEY = "e5464675f9d481b04c981cb851d15413";

export const CITY_DATA = [
  {
    CityCode: "1248991",
    CityName: "Colombo",
    Temp: "33.0",
    Status: "Clouds",
  },
  {
    CityCode: "1850147",
    CityName: "Tokyo",
    Temp: "8.6",
    Status: "Clear",
  },
  {
    CityCode: "2644210",
    CityName: "Liverpool",
    Temp: "16.5",
    Status: "Rain",
  },
  {
    CityCode: "2988507",
    CityName: "Paris",
    Temp: "22.4",
    Status: "Clear",
  },
  {
    CityCode: "2147714",
    CityName: "Sydney",
    Temp: "27.3",
    Status: "Rain",
  },
  {
    CityCode: "4930956",
    CityName: "Boston",
    Temp: "4.2",
    Status: "Mist",
  },
  {
    CityCode: "1796236",
    CityName: "Shanghai",
    Temp: "10.1",
    Status: "Clouds",
  },
  {
    CityCode: "3143244",
    CityName: "Oslo",
    Temp: "-3.9",
    Status: "Clear",
  },
];

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
]; // Add more colors as needed

export const weatherIcons = {
  "01d": faSun,
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
