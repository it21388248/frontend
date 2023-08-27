import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import "./styles.css";

const API_KEY = "e5464675f9d481b04c981cb851d15413";
const CITY_DATA = [
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

//Random Color Generator Function
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCityIndex, setSelectedCityIndex] = useState(null);

  const navigate = useNavigate();

  const handleCityBoxClick = (index, cityData) => {
    setSelectedCityIndex(index);
    navigate("/aa", { state: { cityData } });
  };

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/group?id=${CITY_DATA.map(
            (city) => city.CityCode
          ).join(",")}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data.list);
      } catch (error) {
        console.error(error);
        // Handle the error state
      }
    }

    fetchWeatherData();
  }, []);

  if (CITY_DATA.length === 0 || weatherData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  const randomColors = Array.from({ length: CITY_DATA.length }, () =>
    generateRandomColor()
  );

  return (
    <div>
      <header className="header">
        <div className="header-icon"></div>
        <div className="header-text">Weather App</div>
      </header>
      <div className="box-container">
        {weatherData.map((cityData, index) => (
          <div
            className="box"
            key={index}
            onClick={() => handleCityBoxClick(index, cityData)}
          >
            {/* Upper Part */}
            <div
              className="upper-part"
              style={{ backgroundColor: randomColors[index] }}
            >
              <div className="upper-left">
                <div className="city">{CITY_DATA[index].CityName}</div>
                <div className="time mt-4">
                  {new Date(cityData.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                <div className="description">
                  {cityData.weather[0].description}
                </div>
              </div>
              <div className="upper-right">
                <div className="temperature">
                  {Math.round(cityData.main.temp)}°C
                </div>
                <div>Temp Min: {Math.round(cityData.main.temp_min)}°C</div>
                <div>Temp Max: {Math.round(cityData.main.temp_max)}°C</div>
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
                  {/* <img src={Wind} alt="wind" /> */}
                  <CiLocationArrow1 className="w-8 h-8" />
                </div>
                <div>
                  {cityData.wind.speed}m/s {cityData.wind.deg} Degree
                </div>
              </div>
              <div className="lower-right">
                <div>
                  <p className="bold-text">Sunrise: </p>
                  {new Date(cityData.sys.sunrise * 1000).toLocaleTimeString()}
                </div>
                <div>
                  <p className="bold-text">Sunset: </p>
                  {new Date(cityData.sys.sunset * 1000).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer mt-10 h-11">2021 Fidenz Technologies</footer>
    </div>
  );
};

export default WeatherApp;
