import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrowOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { predefinedColors } from "../../constants";
import "./styles.css";
import API_URL from "../../APIHelper";
import Data from "../cities.json";
import Footer from "../footer";
import { getWeatherIcon } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_KEY = process.env.REACT_APP_API_KEY;

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCityIndex, setSelectedCityIndex] = useState(null);
  const [hiddenBoxes, setHiddenBoxes] = useState([]);
  const navigate = useNavigate();

  const apiURL = useMemo(() => {
    return `${API_URL}/group?id=${Data.map((city) => city.CityCode).join(
      ","
    )}&units=metric&appid=${API_KEY}`;
  }, []);

  const fetchWeatherData = async () => {
    try {
      const cachedData = JSON.parse(localStorage.getItem("weatherData"));
      if (cachedData && Date.now() - cachedData.timestamp < Date.now()) {
        // Use cached data if it's less than 5 minutes old
        setWeatherData(cachedData.data.list);
      } else {
        const response = await fetch(apiURL);

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
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
      // Handle the error state
    }
  };

  const handleCityBoxClick = (index, cityData) => {
    setSelectedCityIndex(index);
    navigate("/aa", { state: { cityData, color: predefinedColors[index] } });
  };

  const handleRemoveBoxClick = (index) => {
    setHiddenBoxes((prevHiddenBoxes) => [...prevHiddenBoxes, index]);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [apiURL]);

  useEffect(() => {
    // Clear hidden boxes when the page is refreshed
    setHiddenBoxes([]);
  }, []);

  if (Data.length === 0 || weatherData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <header className="header">
        <div className="header-icon"></div>
        <div className="header-text">Weather App</div>
      </header>
      <div className="AddCity">
        <input type="text" id="myInput" placeholder="Enter text here" />
        <input type="button" value="Submit" onClick={submitForm} />
      </div>

      <div className="box-container">
        {weatherData.map(
          (cityData, index) =>
            // Check if the box should be hidden
            !hiddenBoxes.includes(index) && (
              <div
                className="box"
                key={index}
                onClick={() => handleCityBoxClick(index, cityData)}
              >
                {/* Upper Part */}
                <div className="weather-box">
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
                      <div className="city">{Data[index].CityName}, {cityData.sys.country}</div>
                      <div className="time mt-0">
                        {new Date(cityData.dt * 1000).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="description">
                        {cityData.weather[0].description}
                        <FontAwesomeIcon
                          className="weather-iconM"
                          icon={getWeatherIcon(cityData.weather[0].icon)}
                        />
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
                      {(cityData.visibility / 1000).toFixed(1)} km
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
                        cityData.sys.sunrise * 1000
                      ).toLocaleTimeString()}
                    </div>
                    <div>
                      <p className="bold-text">Sunset: </p>
                      {new Date(
                        cityData.sys.sunset * 1000
                      ).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      <Footer />
    </div>
  );
};

function submitForm() {
  // Add your form submission logic here
}

export default WeatherApp;
