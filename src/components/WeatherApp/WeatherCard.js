import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrowOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { predefinedColors } from "../../constants";
import "./styles.css";
import API_URL from "../../APIHelper";
import Data from "../../cities.json";
import Footer from "../footer";
import Header from "../Header";
import {
  getWeatherIcon,
  REFRESH_INTERVAL,
  METERS_TO_KILOMETERS,
  MILLISECONDS_TO_SECONDS,
} from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_KEY =
  process.env.WEATHER_APP_API_KEY || "e5464675f9d481b04c981cb851d15413";

const WeatherApp = () => {
  // State variables
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCityIndex, setSelectedCityIndex] = useState(null);
  const [error, setError] = useState(null);
  const [hiddenBoxes, setHiddenBoxes] = useState([]);
  const navigate = useNavigate();

  const apiURL = `${API_URL}/group?id=${Data.map((city) => city.CityCode).join(
    ","
  )}&units=metric&appid=${API_KEY}`;

  const fetchWeatherData = async () => {
    try {
      const cachedData = JSON.parse(localStorage.getItem("weatherData"));
      if (cachedData && Date.now() - cachedData.timestamp < REFRESH_INTERVAL) {
        console.log(Date.now());
        // Use cached data if it's less than 5 minutes old
        setWeatherData(cachedData.data.list);
      } else {
        const response = await fetch(apiURL);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch weather data. Status: ${response.status}`
          );
        }

        const data = await response.json();
        // Save data to localStorage with a timestamp
        localStorage.setItem(
          "weatherData",
          JSON.stringify({ data, timestamp: Date.now() })
        );
        setWeatherData(data.list);
      }
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while fetching weather data. Please try again later."
      );
    }
  };

  // Function to handle a click on a city box
  const handleCityBoxClick = (index, cityData) => {
    setSelectedCityIndex(index);
    navigate("/aa", { state: { cityData, color: predefinedColors[index] } });
  };

  // Function to handle click on the remove box (to hide a city box)
  const handleRemoveBoxClick = (index) => {
    setHiddenBoxes((prevHiddenBoxes) => [...prevHiddenBoxes, index]);
  };

  useEffect(() => {
    // Remove duplicate API requests by checking cached data
    const cachedData = JSON.parse(localStorage.getItem("weatherData"));
    if (cachedData && Date.now() - cachedData.timestamp < REFRESH_INTERVAL) {
      setWeatherData(cachedData.data.list);
    } else {
      fetchWeatherData();
    }
  }, [apiURL]);

  useEffect(() => {
    // Clear hidden boxes when the page is refreshed
    setHiddenBoxes([]);
  }, []);

  // Loading state if data is not yet available
  if (Data.length === 0 || weatherData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        {error || "Loading..."}
      </div>
    );
  }

  return (
    <>
      <div>
        <Header />
        <div className="AddCity flex justify-center pb-5">
          <input
            type="text"
            className=" h-8 bg-gray-800 rounded-l-sm p-2 text-white"
            id="myInput"
            placeholder="Enter a city"
          />
          <input
            type="button"
            className=" bg-purple-700 b-2 w-24 h-8 rounded-md text-white font-bold"
            value="Add City"
          />
        </div>

        <div className="box-container  ">
          {weatherData.map(
            (cityData, index) =>
              // Check if the box should be hidden
              !hiddenBoxes.includes(index) && (
                <div
                  className="box "
                  key={index}
                  onClick={() => handleCityBoxClick(index, cityData)}
                >
                  {/* Upper Part */}
                  <div className="weather-box ">
                    <div
                      className="upper-part"
                      style={{ backgroundColor: predefinedColors[index] }}
                    >
                      <div className="cross">
                        <RxCross2
                          className="w-5 h-5"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveBoxClick(index);
                          }}
                        />
                      </div>
                      <div className="upper-left">
                        <div className="city">
                          {Data[index].CityName}, {cityData.sys.country}
                        </div>
                        <div className="time mt-0 text-sm">
                          {new Date(cityData.dt * 1000).toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="description ml-2">
                          <FontAwesomeIcon
                            className="weather-iconM mr-2 mt-3"
                            icon={getWeatherIcon(cityData.weather[0].icon)}
                          />
                          {cityData.weather[0].description}
                        </div>
                      </div>
                      <div className="upper-right">
                        <div className="temperature">
                          {Math.round(cityData.main.temp)}°C
                        </div>
                        <div>
                          Temp Min: {Math.round(cityData.main.temp_min)}°C
                        </div>
                        <div>
                          Temp Max: {Math.round(cityData.main.temp_max)}°C
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Lower Part */}
                  <div className="lower-part">
                    <div className="lower-left ms-0">
                      <div>
                        <p className="bold-text">Pressure:</p>{" "}
                        {cityData.main.pressure}hPa
                      </div>
                      <div>
                        <p className="bold-text ms-0">Humidity:</p>
                        {cityData.main.humidity}%
                      </div>
                      <div>
                        <p className="bold-text">Visibility:</p>{" "}
                        {(cityData.visibility * METERS_TO_KILOMETERS).toFixed(
                          1
                        )}{" "}
                        km
                      </div>
                    </div>

                    <div className="lower-center">
                      <div>
                        <TiLocationArrowOutline className="w-8 h-8" />
                      </div>
                      <div>
                        {cityData.wind.speed}m/s {cityData.wind.deg} Degree
                      </div>
                    </div>
                    <div className="lower-right">
                      <div>
                        <p className="bold-text">Sunrise: </p>
                        {new Date(
                          cityData.sys.sunrise * MILLISECONDS_TO_SECONDS
                        ).toLocaleTimeString()}
                      </div>
                      <div>
                        <p className="bold-text">Sunset: </p>
                        {new Date(
                          cityData.sys.sunset * MILLISECONDS_TO_SECONDS
                        ).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className=" mt-10">
        <Footer />
      </div>
    </>
  );
};

export default WeatherApp;
