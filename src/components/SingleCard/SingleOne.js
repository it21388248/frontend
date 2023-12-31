
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TiLocationArrowOutline } from "react-icons/ti";
import { BsArrowLeftShort } from "react-icons/bs";
import { getWeatherIcon } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./single.css";
import Header from "../Header";

const SingleOne = () => {
  // Access location and navigate from hooks
  const navigate = useNavigate();

  // Access location state
  const location = useLocation();
  const { cityData, backgroundColor } = location.state || {}; // Ensure cityData is defined

  // Check if cityData is defined before accessing its properties
  if (!cityData) {
    return (
      <div>
        <p>Error: City data is undefined.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="containerS">
          <Header />

          <div className="boxS">
            <div className="upper-partSingle" style={{ backgroundColor }}>
              <div className="arrow-icon" onClick={() => navigate(-1)}>
                <BsArrowLeftShort className="w-8 h-8" />
              </div>

              <div className="citySingle">
                {cityData.name}, {cityData.sys.country}
              </div>
              <div className="time mt-0">
                {new Date(cityData.dt * 1000).toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="upper-bottomSingle">
                <div className="upper-left"></div>
                <div className="ss">
                  <div className="upper-rightSingle">
                    <FontAwesomeIcon
                      className="iconS"
                      icon={getWeatherIcon(cityData.weather[0].icon)}
                      size="2x"
                    />
                    <div className="descriptionS">
                      {cityData.weather[0].description}
                    </div>
                  </div>
                  <div className="upper-leftSingle">
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
            <div className="lower-part">
              <div className="lower-left ms-0">
                <div>
                  <p className="bold-text">Pressure:</p>{" "}
                  {cityData.main.pressure} hPa
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
                  <TiLocationArrowOutline className="w-8 h-8" />
                </div>
                <div>
                  {cityData.wind.speed}m/s {cityData.wind.deg} Degree
                </div>
              </div>
              <div className="lower-right">
                <div>
                  <p className="bold-text">Sunrise: </p>
                  {new Date(cityData.sys.sunrise * 1000).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
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
    </>
  );
};

export default SingleOne;
