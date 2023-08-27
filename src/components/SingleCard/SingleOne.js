import React from "react";
import { useLocation } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";

import "./single.css";

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const SingleOne = () => {
  const location = useLocation();
  const { cityData } = location.state;

  return (
    <div>
      <header className="header">
        <div className="header-icon"></div>
        <div className="header-text">Weather App</div>
      </header>
      <div className="box-container" >
        <div className="box">
          {/* Upper Part */}
          <div
            className="upper-partSingle"
            style={{ backgroundColor: generateRandomColor() }}
          >
            <div className="citySingle">{cityData.name}</div>
            <div className="time mt-0">
              {new Date(cityData.dt * 1000).toLocaleString([], {
                month: "short", // Display short month name
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="upper-bottom">
              <div className="upper-left"></div>
              <div className="ss">
                <div className="upper-right">
                  <div className="description">
                    {cityData.weather[0].description}
                  </div>
                </div>

                <div className="upper-left">
                  <div className="temperatureSingle">
                    {Math.round(cityData.main.temp)}°C
                  </div>
                  <div className="small-text">
                    Temp Min: {Math.round(cityData.main.temp_min)}°C
                  </div>
                  <div className="small-text">
                    Temp Max: {Math.round(cityData.main.temp_max)}°C
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Lower Part */}
          <div className="lower-part">
            <div className="lower-left ms-0">
              <div>
                <p className="bold-text">Pressure:</p> {cityData.main.pressure}
                hPa
              </div>
              <div>
                <p className="bold-text ms-0">Humidity:</p>{" "}
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
                {new Date(cityData.sys.sunrise * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                <p className="bold-text">Sunset: </p>
                {new Date(cityData.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default SingleOne;
